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
      env.DB.prepare("CREATE TABLE IF NOT EXISTS events (ts INTEGER, day TEXT, name TEXT, n INTEGER, vid TEXT, signed INTEGER)"),
      env.DB.prepare("CREATE INDEX IF NOT EXISTS events_day ON events(day)"),
      env.DB.prepare("CREATE TABLE IF NOT EXISTS push (id TEXT PRIMARY KEY, endpoint TEXT, hour INTEGER, tz TEXT, seen TEXT, sent TEXT, created INTEGER)"),
    ]);
    for (const col of ["app INTEGER", "nv INTEGER", "cc TEXT"]) { try { await env.DB.prepare("ALTER TABLE hits ADD COLUMN " + col).run(); } catch {} }
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
/* ---------- daily reminders: Web Push with no message body (the app shows the text), signed with VAPID ---------- */
let VKEY = null;
async function vapidHeaders(env, endpoint) {
  if (!VKEY) VKEY = await crypto.subtle.importKey("jwk", JSON.parse(env.VAPID_PRIVATE), { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  const enc = (o) => btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const head = enc({ typ: "JWT", alg: "ES256" }), body = enc({ aud: new URL(endpoint).origin, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: "mailto:gcseasy.app@gmail.com" });
  const sig = new Uint8Array(await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, VKEY, new TextEncoder().encode(head + "." + body)));
  const s64 = btoa(String.fromCharCode(...sig)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return { Authorization: `vapid t=${head}.${body}.${s64}, k=${env.VAPID_PUBLIC}`, TTL: "43200", Urgency: "normal", "Content-Length": "0" };
}
const localNow = (tz) => { try { const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: tz || "Europe/London", hour: "2-digit", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date()).map((x) => [x.type, x.value])); return { hour: +p.hour, day: `${p.year}-${p.month}-${p.day}` }; } catch { return { hour: new Date().getUTCHours(), day: today() }; } };
async function runReminders(env) {
  const D = await db(env); const rows = (await D.prepare("SELECT id, endpoint, hour, tz, seen, sent FROM push").all()).results || [];
  let sent = 0, gone = 0, skipped = 0;
  for (const r of rows) {
    const n = localNow(r.tz);
    if (n.hour !== r.hour || r.sent === n.day || r.seen === n.day) { skipped++; continue; } // not their time, already reminded, or already revised today
    try {
      const res = await fetch(r.endpoint, { method: "POST", headers: await vapidHeaders(env, r.endpoint) });
      if (res.status === 404 || res.status === 410) { await D.prepare("DELETE FROM push WHERE id = ?").bind(r.id).run(); gone++; }
      else { await D.prepare("UPDATE push SET sent = ? WHERE id = ?").bind(n.day, r.id).run(); if (res.ok) sent++; }
    } catch { /* try again next hour */ }
  }
  return { sent, gone, skipped, total: rows.length };
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

/* class goals: the class creator picks one; progress comes from each member's last 14 days of activity */
const GOALS = {
  xp: { label: (n) => `Earn ${n} XP each`, idx: 0, targets: [100, 250, 500] },
  cards: { label: (n) => `Review ${n} flashcards each`, idx: 1, targets: [50, 150, 300] },
  quiz: { label: (n) => `Get ${n} quiz questions right each`, idx: 2, targets: [25, 50, 100] },
  exam: { label: (n) => `Earn ${n} exam marks each`, idx: 3, targets: [20, 50, 100] },
  daily: { label: (n) => `Do the daily challenge on ${n} days`, idx: 4, targets: [3, 5, 7] },
  streak: { label: (n) => `Reach a ${n}-day streak`, idx: -1, targets: [3, 5, 7] },
};
function goalProgress(goal, m) {
  if (!goal || !GOALS[goal.type]) return 0;
  if (goal.type === "streak") return Math.min(goal.target, m.st || 0);
  const i = GOALS[goal.type].idx; let n = 0;
  for (const [d, v] of Object.entries(m.dy || {})) if (d >= goal.start && d <= goal.end && Array.isArray(v)) n += +v[i] || 0;
  return Math.min(goal.target, n);
}
function pub(g) {
  const members = Object.entries(g.members || {}).map(([id, m]) => ({
    id: id.slice(0, 8), name: m.n, streak: m.st || 0, mins: m.mi || 0,
    daily: m.dl && m.dl.date === today() ? m.dl : null, answered: m.ca || 0, seen: m.t || 0, badges: m.bg || 0,
    goal: g.goal ? goalProgress(g.goal, m) : null,
  }));
  members.sort((a, b) => b.streak - a.streak || (b.daily?.score ?? -1) - (a.daily?.score ?? -1) || b.mins - a.mins);
  const goal = g.goal && GOALS[g.goal.type] ? Object.assign({}, g.goal, { label: GOALS[g.goal.type].label(g.goal.target), done: members.filter((x) => x.goal >= g.goal.target).length, over: today() > g.goal.end }) : null;
  return { code: g.code, name: g.name, owner: g.owner ? g.owner.slice(0, 8) : null, goal, members };
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
      try { const t = await req.text(); body = t ? JSON.parse(t) : {}; } catch { return fail("bad_request", "Send JSON."); }
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
        const cc = String(req.headers.get("X-Country") || (req.cf && req.cf.country) || "").replace(/[^A-Z]/g, "").slice(0, 2);
        await (await db(env)).prepare("INSERT INTO hits (ts, day, path, vid, ref, dev, signed, app, nv, cc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
          .bind(Date.now(), today(), p, vid, ref, dev, body.s ? 1 : 0, body.a ? 1 : 0, body.n ? 1 : 0, cc).run();
        return json({ ok: true });
      }
      if (path === "/ev" && req.method === "POST") { // what people do: {c: {quiz: 3, cards: 12, install: 1}}
        if (!env.DB) return json({ ok: false });
        const ua = req.headers.get("User-Agent") || "";
        if (/bot|crawl|spider|headless/i.test(ua)) return json({ ok: true });
        const vid = await sha(ip + "|" + ua + "|" + today() + "|" + (env.ADMIN_EMAIL || "gcseasy"));
        const items = Object.entries(body.c || {}).filter(([k, n]) => /^[a-z]{2,14}$/.test(k) && +n > 0).slice(0, 15);
        if (items.length) { const D = await db(env), now = Date.now();
          await D.batch(items.map(([k, n]) => D.prepare("INSERT INTO events (ts, day, name, n, vid, signed) VALUES (?, ?, ?, ?, ?, ?)").bind(now, today(), k, Math.min(500, Math.round(+n)), vid, body.s ? 1 : 0))); }
        return json({ ok: true });
      }
      if (path === "/push/sub" && req.method === "POST") { // save or update a device's reminder
        if (!env.DB || !env.VAPID_PRIVATE) return fail("off", "Reminders aren't switched on yet.", 404);
        const ep = String((body.sub && body.sub.endpoint) || "");
        if (!(/^https:\/\/[^/]+\//.test(ep) || (env.ALLOW_LOCAL_PUSH && /^http:\/\/localhost:/.test(ep))) || ep.length > 1000) return fail("bad_request", "That subscription isn't valid.");
        const hour = Math.max(0, Math.min(23, parseInt(body.hour, 10) || 18)), tz = String(body.tz || "Europe/London").slice(0, 40);
        const id = await sha("push|" + ep);
        await (await db(env)).prepare("INSERT INTO push (id, endpoint, hour, tz, created) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET hour = excluded.hour, tz = excluded.tz").bind(id, ep, hour, tz, Date.now()).run();
        return json({ id, hour });
      }
      if (path === "/push/off" && req.method === "POST") {
        if (env.DB) await (await db(env)).prepare("DELETE FROM push WHERE id = ?").bind(String(body.id || "").slice(0, 32)).run();
        return json({ ok: true });
      }
      if (path === "/push/seen" && req.method === "POST") { // revised today: no reminder needed
        if (env.DB) { const tz = String(body.tz || "Europe/London").slice(0, 40); await (await db(env)).prepare("UPDATE push SET seen = ? WHERE id = ?").bind(localNow(tz).day, String(body.id || "").slice(0, 32)).run(); }
        return json({ ok: true });
      }
      if (path === "/push/test" && req.method === "POST") { // send one reminder now to this device (3 a day)
        if (!env.DB || !env.VAPID_PRIVATE) return fail("off", "Reminders aren't switched on yet.", 404);
        const id = String(body.id || "").slice(0, 32);
        const row = await (await db(env)).prepare("SELECT endpoint FROM push WHERE id = ?").bind(id).first();
        if (!row) return fail("not_found", "Turn reminders on first.", 404);
        if (!(await bump(env, `pt:${id}:${today()}`, 3))) return fail("rate_limited", "That's enough tests for today.", 429);
        const res = await fetch(row.endpoint, { method: "POST", headers: await vapidHeaders(env, row.endpoint) });
        if (res.status === 404 || res.status === 410) { await (await db(env)).prepare("DELETE FROM push WHERE id = ?").bind(id).run(); return fail("gone", "This device's reminder has expired. Turn reminders off and on again.", 410); }
        return res.ok ? json({ ok: true }) : fail("push_failed", "The notification service said no (" + res.status + "). Try again later.", 502);
      }
      if (path === "/push/run" && (req.method === "POST" || req.method === "GET")) { // called every hour by a schedule; safe to call more often
        if (!env.DB || !env.VAPID_PRIVATE) return fail("off", "Reminders aren't switched on yet.", 404);
        return json(await runReminders(env));
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
        if (!u.verified) return fail("verify", "Verify your email first.", 403);
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
        const [byDay, tot, pages, refs, devs, users, newByDay, recent, ...extra] = (await D.batch([
          q("SELECT day, COUNT(*) AS views, COUNT(DISTINCT vid) AS visitors FROM hits WHERE day >= ? GROUP BY day ORDER BY day", day(29)),
          q("SELECT SUM(day = ?) AS v1, COUNT(DISTINCT CASE WHEN day = ? THEN vid END) AS u1, SUM(day >= ?) AS v7, COUNT(DISTINCT CASE WHEN day >= ? THEN vid END) AS u7, COUNT(*) AS v30, COUNT(DISTINCT vid) AS u30, SUM(signed) AS s30 FROM hits WHERE day >= ?", t0, t0, day(6), day(6), day(29)),
          q("SELECT path, COUNT(*) AS n FROM hits WHERE day >= ? GROUP BY path ORDER BY n DESC LIMIT 12", day(6)),
          q("SELECT ref, COUNT(*) AS n FROM hits WHERE day >= ? AND ref != '' GROUP BY ref ORDER BY n DESC LIMIT 8", day(29)),
          q("SELECT dev, COUNT(DISTINCT vid) AS n FROM hits WHERE day >= ? GROUP BY dev", day(6)),
          q("SELECT COUNT(*) AS total, SUM(verified) AS verified, SUM(last_seen >= ?) AS active7, SUM(created >= ?) AS new7, SUM(created >= ?) AS new1 FROM users", Date.now() - 7 * 864e5, Date.now() - 7 * 864e5, new Date(t0 + "T00:00:00Z").getTime()),
          q("SELECT date(created / 1000, 'unixepoch') AS day, COUNT(*) AS n FROM users WHERE created >= ? GROUP BY day ORDER BY day", Date.now() - 30 * 864e5),
          q("SELECT email, created, last_seen, verified FROM users ORDER BY created DESC LIMIT 10"),
          q("SELECT COUNT(DISTINCT vid) AS live FROM hits WHERE ts >= ?", Date.now() - 5 * 60e3),
          q("SELECT COALESCE(SUM(n), 0) AS total, COALESCE(SUM(CASE WHEN day >= ? THEN n END), 0) AS week, COALESCE(SUM(CASE WHEN day = ? THEN n END), 0) AS today FROM events WHERE name = 'install'", day(6), t0),
          q("SELECT COUNT(DISTINCT CASE WHEN app = 1 THEN vid END) AS app7, COUNT(DISTINCT CASE WHEN nv = 1 THEN vid END) AS new7, COUNT(DISTINCT vid) AS all7 FROM hits WHERE day >= ?", day(6)),
          q("SELECT CAST(strftime('%H', ts / 1000, 'unixepoch') AS INTEGER) AS h, COUNT(*) AS n FROM hits WHERE day >= ? GROUP BY h", day(6)),
          q("SELECT name, SUM(n) AS n, COUNT(DISTINCT vid) AS people FROM events WHERE day >= ? AND name != 'install' GROUP BY name ORDER BY n DESC", day(6)),
          q("SELECT cc, COUNT(DISTINCT vid) AS n FROM hits WHERE day >= ? AND cc != '' AND cc IS NOT NULL GROUP BY cc ORDER BY n DESC LIMIT 8", day(29)),
          q("SELECT strftime('%w', ts / 1000, 'unixepoch') AS wd, COUNT(DISTINCT vid || day) AS n FROM hits WHERE day >= ? GROUP BY wd", day(27)),
        ])).map((r) => r.results || []);
        const [live, inst, appRow, hours, acts, countries, weekdays] = extra;
        const aiToday = parseInt((await env.LB.get(`ai:${t0}`)) || "0", 10), aiYest = parseInt((await env.LB.get(`ai:${day(1)}`)) || "0", 10);
        let classes = null, classList = [];
        try {
          const keys = (await env.LB.list({ prefix: "g:", limit: 1000 })).keys;
          const wk = Date.now() - 7 * 864e5;
          for (const k of keys.slice(0, 300)) {
            let g = null; try { g = JSON.parse((await env.LB.get(k.name)) || "null"); } catch {}
            if (!g) continue;
            const ms = Object.values(g.members || {});
            if (!ms.length) { await env.LB.delete(k.name); continue; } // tidy up any empty class
            classList.push({ name: g.name, code: g.code, members: ms.length, active7: ms.filter((m) => (m.t || 0) >= wk).length,
              created: g.created || null, last: Math.max(...ms.map((m) => m.t || 0)), xp7: ms.reduce((a, m) => a + (m.mi || 0), 0) });
          }
          classList.sort((a, b) => b.members - a.members || b.last - a.last);
          classes = classList.length;
        } catch {}
        if (Math.random() < 0.2) await q("DELETE FROM hits WHERE day < ?", day(120)).run();
        return json({ today: t0, byDay, totals: tot[0] || {}, pages, refs, devs, users: users[0] || {}, newByDay,
          recent: recent.map((r) => ({ email: mask(r.email), created: r.created, last_seen: r.last_seen, verified: !!r.verified })),
          reminders: await (async () => { try { return (await D.prepare("SELECT COUNT(*) AS n FROM push").first()).n; } catch { return 0; } })(),
          ai: { today: aiToday, yesterday: aiYest, siteLimit: SITE_DAILY, perUser: PER_IP_DAILY }, classes, classList,
          live: (live[0] || {}).live || 0, installs: inst[0] || {}, app: appRow[0] || {}, hours, acts, countries, weekdays, now: Date.now() });
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
      if ((path === "/lb/create" || path === "/lb/join") && req.method === "POST" && authOn(env)) {
        const u = await who(req, env);
        if (!u) return fail("signin", "Make a free account to create or join a class.", 401);
        if (!u.verified) return fail("verify", "Verify your email first, then you can join classes.", 403);
      }
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
        const g = { code, name: gname, created: Date.now(), owner: id, members: { [id]: { n: nick, t: Date.now() } } };
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
          bg: Math.max(0, Math.min(100, parseInt(s.badges, 10) || 0)),
          dy: (() => { const out = {}; for (const [d, v] of Object.entries(s.days || {}).slice(-14)) if (/^\d{4}-\d{2}-\d{2}$/.test(d) && Array.isArray(v)) out[d] = v.slice(0, 5).map((x) => Math.max(0, Math.min(5000, parseInt(x, 10) || 0))); return out; })(),
          dl: s.daily && /^\d{4}-\d{2}-\d{2}$/.test(s.daily.date)
            ? { date: s.daily.date, score: Math.max(0, Math.min(10, +s.daily.score || 0)), of: Math.max(1, Math.min(10, +s.daily.of || 5)) }
            : m.dl || null,
        };
        const changed = JSON.stringify([m.n, m.st, m.mi, m.ca, m.dl, m.bg, m.dy]) !== JSON.stringify([next.n, next.st, next.mi, next.ca, next.dl, next.bg, next.dy]);
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
          if (!Object.keys(g.members).length) await env.LB.delete("g:" + g.code); // last one out: the class is gone
          else {
            if (g.owner === String(body.id)) g.owner = Object.entries(g.members).sort((a, b) => (a[1].t || 0) - (b[1].t || 0))[0][0]; // hand it on
            await env.LB.put("g:" + g.code, JSON.stringify(g));
          }
        }
        return json({ ok: true });
      }
      if (path === "/lb/goal" && req.method === "POST") { // creator sets or clears the class goal
        const g = await getGroup(env, body.code);
        if (!g) return fail("not_found", "No group with that code.", 404);
        if (!g.owner || g.owner !== String(body.id || "")) return fail("forbidden", "Only the person who made this class can set goals.", 403);
        if (body.type === "none") delete g.goal;
        else {
          const G = GOALS[body.type]; const target = parseInt(body.target, 10), days = Math.max(1, Math.min(28, parseInt(body.days, 10) || 7));
          if (!G || !G.targets.includes(target)) return fail("bad_request", "Pick one of the goals.");
          const end = new Date(Date.now() + (days - 1) * 864e5).toISOString().slice(0, 10);
          g.goal = { type: body.type, target, start: today(), end, set: Date.now() };
        }
        await env.LB.put("g:" + g.code, JSON.stringify(g));
        return json(pub(g));
      }
      if (path === "/lb/delete" && req.method === "POST") { // the class creator can delete it for everyone
        const g = await getGroup(env, body.code);
        if (!g) return json({ ok: true });
        if (!g.owner || g.owner !== String(body.id || "")) return fail("forbidden", "Only the person who made this class can delete it.", 403);
        await env.LB.delete("g:" + g.code);
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
