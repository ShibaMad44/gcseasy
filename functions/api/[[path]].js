import api from "../_lib/api.js";
// Serves /api/* on the site's own domain. Uses this Pages project's AI and LB bindings when they are set up;
// until then it forwards to the separate Worker so nothing breaks.
const FIREBASE_PROJECT_ID = "gceasy-9af03";
const VAPID_PUBLIC = "BPQXuVO-FCkd7U1nk3RRgH2sCCGHUNJBBu9Da2gMxflzbKphAqRE7ztS3VoetSH97elo8RF4wpJl2x60kwVJXD4";
export async function onRequest(ctx) {
  const u = new URL(ctx.request.url);
  const path = u.pathname.replace(/^\/api/, "") || "/";
  if (ctx.env.AI && ctx.env.LB) {
    u.pathname = path;
    const env = Object.assign({ FIREBASE_PROJECT_ID, VAPID_PUBLIC }, ctx.env);
    const h = new Headers(ctx.request.headers); h.set("X-Country", (ctx.request.cf && ctx.request.cf.country) || "");
    const r = await api.fetch(new Request(u.toString(), { method: ctx.request.method, headers: h, body: ctx.request.method === "POST" ? await ctx.request.text() : undefined }), env);
    const out = new Response(r.body, r); out.headers.set("X-GCSEasy-Mode", "direct"); return out;
  }
  const target = "https://gcseasy-api.pandoplayzrblx.workers.dev" + path + u.search;
  const init = { method: ctx.request.method, headers: { "Content-Type": "application/json", "X-Forwarded-For": ctx.request.headers.get("CF-Connecting-IP") || "", "Authorization": ctx.request.headers.get("Authorization") || "" } };
  if (ctx.request.method === "POST") init.body = await ctx.request.text();
  const r = await fetch(target, init);
  const out = new Response(r.body, r); out.headers.set("X-GCSEasy-Mode", "forward"); return out;
}
