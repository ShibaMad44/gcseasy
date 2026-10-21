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
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
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
  return n + 1;
}
const PER_IP_SIGNED = 400;  // with accounts: per-network safety cap (a whole school shares one IP)

/* ---------- accounts: Firebase ID tokens (RS256), verified with Google's public keys ---------- */
let JWKS = null, JWKS_AT = 0;
const b64u = (s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=")), (c) => c.charCodeAt(0));
async function jwks(force) {
  if (JWKS && !force && Date.now() - JWKS_AT < 3600e3) return JWKS;
  const r = await fetch("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com");
  const j = await r.json(); const out = {};
  for (const k of j.keys || []) out[k.kid] = await crypto.subtle.importKey("jwk", { kty: k.kty, n: k.n, e: k.e, alg: "RS256", ext: true }, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  JWKS = out; JWKS_AT = Date.now(); return JWKS;
}
async function verifyToken(tok, projectId) {
  try {
    const [h, p, sig] = String(tok || "").split(".");
    if (!sig) return null;
    const head = JSON.parse(new TextDecoder().decode(b64u(h))), pay = JSON.parse(new TextDecoder().decode(b64u(p)));
    if (head.alg !== "RS256") return null;
    let key = (await jwks())[head.kid]; if (!key) key = (await jwks(true))[head.kid]; if (!key) return null;
    if (!(await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64u(sig), new TextEncoder().encode(h + "." + p)))) return null;
    const now = Date.now() / 1000;
    if (pay.aud !== projectId || pay.iss !== "https://securetoken.google.com/" + projectId || !pay.sub || pay.exp < now || pay.iat > now + 300) return null;
    return { uid: pay.sub, email: String(pay.email || "").toLowerCase(), verified: !!pay.email_verified };
  } catch { return null; }
}
const authOn = (env) => !!(env.FIREBASE_PROJECT_ID && env.DB);
async function who(req, env) {
  const m = (req.headers.get("Authorization") || "").match(/^Bearer (.+)$/);
  return m && env.FIREBASE_PROJECT_ID ? verifyToken(m[1], env.FIREBASE_PROJECT_ID) : null;
}
const isAdmin = (u, env) => !!(u && u.verified && env.ADMIN_EMAIL && u.email === String(env.ADMIN_EMAIL).trim().toLowerCase());

/* ---------- database (Cloudflare D1): accounts, synced progress, anonymous page views ---------- */
let SCHEMA = false;
async function db(env) {
  if (!SCHEMA) {
    await env.DB.batch([
      env.DB.prepare("CREATE TABLE IF NOT EXISTS users (uid TEXT PRIMARY KEY, email TEXT, created INTEGER, last_seen INTEGER, verified INTEGER DEFAULT 0)"),
      env.DB.prepare("CREATE TABLE IF NOT EXISTS progress (uid TEXT PRIMARY KEY, data TEXT, updated INTEGER)"),
      env.DB.prepare("CREATE TABLE IF NOT EXISTS hits (ts INTEGER, day TEXT, path TEXT, vid TEXT, ref TEXT, dev TEXT, signed INTEGER)"),
      env.DB.prepare("CREATE INDEX IF NOT EXISTS hits_day ON hits(day)"),
    ]);
    SCHEMA = true;
  }
  return env.DB;
}
async function touchUser(env, u) {
  const D = await db(env), now = Date.now();
  const row = await D.prepare("SELECT created, last_seen, verified FROM users WHERE uid = ?").bind(u.uid).first();
  if (!row) await D.prepare("INSERT INTO users (uid, email, created, last_seen, verified) VALUES (?, ?, ?, ?, ?)").bind(u.uid, u.email, now, now, u.verified ? 1 : 0).run();
  else if (now - (row.last_seen || 0) > 3600e3 || (!!row.verified) !== u.verified)
    await D.prepare("UPDATE users SET last_seen = ?, verified = ?, email = ? WHERE uid = ?").bind(now, u.verified ? 1 : 0, u.email, u.uid).run();
  return row ? row.created : now;
}
const sha = async (t) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)))].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
function mergeKeys(a, b) { // newest change per key wins
  const out = Object.assign({}, a);
  for (const [k, v] of Object.entries(b || {})) if (v && typeof v.t === "number" && (!out[k] || v.t > out[k].t)) out[k] = { v: v.v == null ? null : String(v.v), t: v.t };
  return out;
}
const mask = (e) => { const [a, d] = String(e).split("@"); return (a || "").slice(0, 2) + "•••@" + (d || ""); };

const nextReset = () => { const d = new Date(); d.setUTCHours(24, 0, 0, 0); return d.toISOString(); };
async function usage(env, ip) {
  const used = parseInt((await env.LB.get(`rl:${ip}:${today()}`)) || "0", 10);
  const site = parseInt((await env.LB.get(`ai:${today()}`)) || "0", 10);
  return { used, limit: PER_IP_DAILY, siteUsed: site, siteLimit: SITE_DAILY, resetsAt: nextReset() };
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
      if (path === "/ai/usage" && req.method === "GET") {
        if (!authOn(env)) return json(await usage(env, ip));
        const u = await who(req, env), base = await usage(env, ip);
        if (!u) return json(Object.assign(base, { used: 0, signin: true }));
        base.used = parseInt((await env.LB.get(`rl:u:${u.uid}:${today()}`)) || "0", 10);
        return json(base);
      }

      // ---- accounts, progress sync, page views, owner dashboard ----
      if (path === "/hit" && req.method === "POST") {
        if (!env.DB) return json({ ok: false });
        const ua = req.headers.get("User-Agent") || "";
        if (/bot|crawl|spider|slurp|headless|lighthouse|preview/i.test(ua)) return json({ ok: true });
        const p = String(body.p || "/").replace(/\?.*$/, "").slice(0, 80);
        let ref = ""; try { const h = new URL(String(body.r || "")).hostname; if (h && !/gcseasy\.pages\.dev$/.test(h)) ref = h.replace(/^www\./, "").slice(0, 60); } catch {}
        const dev = /iPad|Tablet/i.test(ua) ? "tablet" : /Mobi|Android|iPhone/i.test(ua) ? "mobile" : "desktop";
        const vid = await sha(ip + "|" + ua + "|" + today() + "|" + (env.ADMIN_EMAIL || "gcseasy"));
        await (await db(env)).prepare("INSERT INTO hits (ts, day, path, vid, ref, dev, signed) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(Date.now(), today(), p, vid, ref, dev, body.s ? 1 : 0).run();
        return json({ ok: true });
      }
      if (path === "/me" && req.method === "GET") {
        if (!authOn(env)) return fail("off", "Accounts aren't switched on yet.", 404);
        const u = await who(req, env); if (!u) return fail("signin", "Please sign in again.", 401);
        const created = await touchUser(env, u);
        return json({ uid: u.uid, email: u.email, verified: u.verified, created, admin: isAdmin(u, env) });
      }
      if (path === "/sync" && req.method === "POST") {
        if (!authOn(env)) return fail("off", "Accounts aren't switched on yet.", 404);
        const u = await who(req, env); if (!u) return fail("signin", "Please sign in again.", 401);
        const D = await db(env);
        const row = await D.prepare("SELECT data FROM progress WHERE uid = ?").bind(u.uid).first();
        let have = {}; try { have = row ? JSON.parse(row.data) : {}; } catch {}
        const merged = mergeKeys(have, body.keys || {});
        const txt = JSON.stringify(merged);
        if (txt.length > 900000) return fail("too_big", "Your saved progress is too big to sync.", 413);
        if (txt !== (row && row.data)) await D.prepare("INSERT INTO progress (uid, data, updated) VALUES (?, ?, ?) ON CONFLICT(uid) DO UPDATE SET data = excluded.data, updated = excluded.updated").bind(u.uid, txt, Date.now()).run();
        await touchUser(env, u);
        return json({ keys: merged, t: Date.now() });
      }
      if (path === "/account/delete" && req.method === "POST") {
        const u = authOn(env) && (await who(req, env)); if (!u) return fail("signin", "Please sign in again.", 401);
        const D = await db(env);
        await D.batch([D.prepare("DELETE FROM progress WHERE uid = ?").bind(u.uid), D.prepare("DELETE FROM users WHERE uid = ?").bind(u.uid)]);
        return json({ ok: true });
      }
      if (path === "/admin/stats" && req.method === "GET") {
        if (!authOn(env)) return fail("off", "Accounts aren't switched on yet.", 404);
        const u = await who(req, env); if (!isAdmin(u, env)) return fail("forbidden", "This page is only for the site owner.", 403);
        const D = await db(env), day = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10), t0 = today();
        const q = (sql, ...a) => D.prepare(sql).bind(...a);
        const [byDay, tot, pages, refs, devs, users, newByDay, recent] = (await D.batch([
          q("SELECT day, COUNT(*) AS views, COUNT(DISTINCT vid) AS visitors FROM hits WHERE day >= ? GROUP BY day ORDER BY day", day(29)),
          q("SELECT SUM(day = ?) AS v1, COUNT(DISTINCT CASE WHEN day = ? THEN vid END) AS u1, SUM(day >= ?) AS v7, COUNT(DISTINCT CASE WHEN day >= ? THEN vid END) AS u7, COUNT(*) AS v30, COUNT(DISTINCT vid) AS u30, SUM(signed) AS s30 FROM hits WHERE day >= ?", t0, t0, day(6), day(6), day(29)),
          q("SELECT path, COUNT(*) AS n FROM hits WHERE day >= ? GROUP BY path ORDER BY n DESC LIMIT 12", day(6)),
          q("SELECT ref, COUNT(*) AS n FROM hits WHERE day >= ? AND ref != '' GROUP BY ref ORDER BY n DESC LIMIT 8", day(29)),
          q("SELECT dev, COUNT(DISTINCT vid) AS n FROM hits WHERE day >= ? GROUP BY dev", day(6)),
          q("SELECT COUNT(*) AS total, SUM(verified) AS verified, SUM(last_seen >= ?) AS active7, SUM(created >= ?) AS new7, SUM(created >= ?) AS new1 FROM users", Date.now() - 7 * 864e5, Date.now() - 7 * 864e5, new Date(t0 + "T00:00:00Z").getTime()),
          q("SELECT date(created / 1000, 'unixepoch') AS day, COUNT(*) AS n FROM users WHERE created >= ? GROUP BY day ORDER BY day", Date.now() - 30 * 864e5),
          q("SELECT email, created, last_seen, verified FROM users ORDER BY created DESC LIMIT 10"),
        ])).map((r) => r.results || []);
        const aiToday = parseInt((await env.LB.get(`ai:${t0}`)) || "0", 10), aiYest = parseInt((await env.LB.get(`ai:${day(1)}`)) || "0", 10);
        let classes = null; try { classes = (await env.LB.list({ prefix: "g:", limit: 1000 })).keys.length; } catch {}
        if (Math.random() < 0.2) await q("DELETE FROM hits WHERE day < ?", day(120)).run();
        return json({ today: t0, byDay, totals: tot[0] || {}, pages, refs, devs, users: users[0] || {}, newByDay,
          recent: recent.map((r) => ({ email: mask(r.email), created: r.created, last_seen: r.last_seen, verified: !!r.verified })),
          ai: { today: aiToday, yesterday: aiYest, siteLimit: SITE_DAILY, perUser: PER_IP_DAILY }, classes });
      }
      if (path === "/ai" && req.method === "POST") {
        const prompt = String(body.prompt || "");
        if (prompt.length < 20 || prompt.length > 24000) return fail("bad_request", "Prompt length not allowed.");
        let mine;
        if (authOn(env)) {
          const u = await who(req, env);
          if (!u) return fail("signin", "Make a free account to use AI marking.", 401);
          if (!u.verified) return fail("verify", "Verify your email first: tap the link we sent you.", 403);
          if (!(await bump(env, `rl:${ip}:${today()}`, PER_IP_SIGNED))) return json({ code: "rate_limited", error: "Too many AI requests from this network today.", used: PER_IP_DAILY, limit: PER_IP_DAILY, resetsAt: nextReset() }, 429);
          mine = await bump(env, `rl:u:${u.uid}:${today()}`, PER_IP_DAILY);
        } else mine = await bump(env, `rl:${ip}:${today()}`, PER_IP_DAILY);
        if (!mine) return json({ code: "rate_limited", error: "You've used your AI marks for today.", used: PER_IP_DAILY, limit: PER_IP_DAILY, resetsAt: nextReset() }, 429);
        if (!(await bump(env, `ai:${today()}`, SITE_DAILY))) return json({ code: "daily_limit", error: "Site AI limit reached for today.", used: mine, limit: PER_IP_DAILY, resetsAt: nextReset() }, 429);
        const text = await runAI(env, prompt, !!body.json);
        return json({ text, used: mine, limit: PER_IP_DAILY, resetsAt: nextReset() });
      }

      // ---- leaderboards ----
      if ((path === "/lb/create" || path === "/lb/join") && req.method === "POST" && authOn(env) && !(await who(req, env)))
        return fail("signin", "Make a free account to create or join a class.", 401);
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
