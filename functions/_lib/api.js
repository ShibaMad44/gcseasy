// GCSEasy API: AI marking/questions (Workers AI) and class leaderboards (KV).
// Bindings needed in the Cloudflare dashboard:
//   AI  → Workers AI
//   LB  → a KV namespace (e.g. "gcseasy-lb")
const MODEL = "@cf/meta/llama-4-scout-17b-16e-instruct";
const BACKUP_MODEL = "@cf/meta/llama-3.1-8b-instruct-fp8-fast";
const PER_IP_DAILY = 40;     // AI requests per person per day
const SITE_DAILY = 150;      // AI requests for the whole site per day (keeps inside the free allowance)
const MAX_MEMBERS = 60;
const BAD = /\b(fuck|shit|cunt|bitch|nigg|fag|wank|dick|pussy|slut|whore|retard)/i;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...cors } });
const fail = (code, error, status = 400) => json({ code, error }, status);
const today = () => new Date().toISOString().slice(0, 10);
const cleanName = (s) => String(s || "").replace(/[^\p{L}\p{N} _.'-]/gu, "").replace(/\s+/g, " ").trim().slice(0, 20);

async function bump(env, key, limit) {
  const n = parseInt((await env.LB.get(key)) || "0", 10);
  if (n >= limit) return false;
  await env.LB.put(key, String(n + 1), { expirationTtl: 60 * 60 * 30 });
  return true;
}

async function runAI(env, prompt, wantJson) {
  const messages = [
    {
      role: "system",
      content:
        "You are an expert, fair UK GCSE examiner and question writer. Follow the user's instructions exactly." +
        (wantJson ? " Reply with ONLY one valid JSON object: no markdown, no code fences, no text before or after it." : ""),
    },
    { role: "user", content: prompt },
  ];
  const opts = { messages, max_tokens: 2200, temperature: 0.3 };
  let out;
  try {
    out = await env.AI.run(MODEL, opts);
  } catch (e) {
    if (/4006|daily free allocation|neurons/i.test(String(e))) throw Object.assign(new Error("limit"), { code: "daily_limit" });
    out = await env.AI.run(BACKUP_MODEL, opts);
  }
  const r = out && out.response;
  return typeof r === "string" ? r : JSON.stringify(r ?? "");
}

function pub(g) {
  const members = Object.entries(g.members || {}).map(([id, m]) => ({
    id: id.slice(0, 8), name: m.n, streak: m.st || 0, mins: m.mi || 0,
    daily: m.dl && m.dl.date === today() ? m.dl : null, answered: m.ca || 0, seen: m.t || 0,
  }));
  members.sort((a, b) => b.streak - a.streak || (b.daily?.score ?? -1) - (a.daily?.score ?? -1) || b.mins - a.mins);
  return { code: g.code, name: g.name, members };
}

async function getGroup(env, code) {
  code = String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
  if (code.length < 4) return null;
  const raw = await env.LB.get("g:" + code);
  return raw ? JSON.parse(raw) : null;
}

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, "");
    const ip = req.headers.get("CF-Connecting-IP") || req.headers.get("X-Forwarded-For") || "x";
    let body = {};
    if (req.method === "POST") {
      try { body = await req.json(); } catch { return fail("bad_request", "Send JSON."); }
    }

    try {
      if (path === "" || path === "/") return json({ ok: true, service: "GCSEasy API" });

      // ---- AI ----
      if (path === "/ai" && req.method === "POST") {
        const prompt = String(body.prompt || "");
        if (prompt.length < 20 || prompt.length > 24000) return fail("bad_request", "Prompt length not allowed.");
        if (!(await bump(env, `rl:${ip}:${today()}`, PER_IP_DAILY))) return fail("rate_limited", "You've used your AI marks for today.", 429);
        if (!(await bump(env, `ai:${today()}`, SITE_DAILY))) return fail("daily_limit", "Site AI limit reached for today.", 429);
        const text = await runAI(env, prompt, !!body.json);
        return json({ text });
      }

      // ---- leaderboards ----
      if (path === "/lb/create" && req.method === "POST") {
        const nick = cleanName(body.nick), gname = cleanName(body.name) || "My group", id = String(body.id || "").slice(0, 64);
        if (nick.length < 2 || BAD.test(nick) || BAD.test(gname)) return fail("bad_name", "Pick a different nickname.");
        if (!id) return fail("bad_request", "Missing id.");
        if (!(await bump(env, `mk:${ip}:${today()}`, 5))) return fail("rate_limited", "Too many groups today.", 429);
        const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let code;
        for (let i = 0; i < 8; i++) {
          code = Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) => A[b % A.length]).join("");
          if (!(await env.LB.get("g:" + code))) break;
        }
        const g = { code, name: gname, created: Date.now(), members: { [id]: { n: nick, t: Date.now() } } };
        await env.LB.put("g:" + code, JSON.stringify(g));
        return json(pub(g));
      }
      if (path === "/lb/join" && req.method === "POST") {
        const nick = cleanName(body.nick), id = String(body.id || "").slice(0, 64);
        if (nick.length < 2 || BAD.test(nick)) return fail("bad_name", "Pick a different nickname.");
        const g = await getGroup(env, body.code);
        if (!g) return fail("not_found", "No group with that code.", 404);
        if (!g.members[id] && Object.keys(g.members).length >= MAX_MEMBERS) return fail("full", "That group is full.");
        g.members[id] = Object.assign(g.members[id] || {}, { n: nick, t: Date.now() });
        await env.LB.put("g:" + g.code, JSON.stringify(g));
        return json(pub(g));
      }
      if (path === "/lb/score" && req.method === "POST") {
        const id = String(body.id || "").slice(0, 64), s = body.stats || {};
        const g = await getGroup(env, body.code);
        if (!g || !g.members[id]) return fail("not_found", "Not in that group.", 404);
        const m = g.members[id];
        const next = {
          n: cleanName(body.name) && !BAD.test(body.name) ? cleanName(body.name) : m.n,
          st: Math.max(0, Math.min(3650, parseInt(s.streak, 10) || 0)),
          mi: Math.max(0, Math.min(10080, parseInt(s.mins, 10) || 0)),
          ca: Math.max(0, Math.min(100000, parseInt(s.cards, 10) || 0)),
          dl: s.daily && /^\d{4}-\d{2}-\d{2}$/.test(s.daily.date)
            ? { date: s.daily.date, score: Math.max(0, Math.min(10, +s.daily.score || 0)), of: Math.max(1, Math.min(10, +s.daily.of || 5)) }
            : m.dl || null,
        };
        const changed = JSON.stringify([m.n, m.st, m.mi, m.ca, m.dl]) !== JSON.stringify([next.n, next.st, next.mi, next.ca, next.dl]);
        if (changed) {
          g.members[id] = Object.assign(m, next, { t: Date.now() });
          await env.LB.put("g:" + g.code, JSON.stringify(g));
        }
        return json(pub(g));
      }
      if (path === "/lb/leave" && req.method === "POST") {
        const g = await getGroup(env, body.code);
        if (g && g.members[String(body.id)]) {
          delete g.members[String(body.id)];
          await env.LB.put("g:" + g.code, JSON.stringify(g));
        }
        return json({ ok: true });
      }
      if (path.startsWith("/lb/") && req.method === "GET") {
        const g = await getGroup(env, path.slice(4));
        if (!g) return fail("not_found", "No group with that code.", 404);
        return json(pub(g));
      }
      return fail("not_found", "Unknown route.", 404);
    } catch (e) {
      if (e && e.code) return fail(e.code, e.message, 429);
      return fail("busy", "Something went wrong. Try again in a minute.", 503);
    }
  },
};
