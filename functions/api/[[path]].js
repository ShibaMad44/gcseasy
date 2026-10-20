import api from "../_lib/api.js";
// Serves /api/* on the site's own domain. Uses this Pages project's AI and LB bindings when they are set up;
// until then it forwards to the separate Worker so nothing breaks.
export async function onRequest(ctx) {
  const u = new URL(ctx.request.url);
  const path = u.pathname.replace(/^\/api/, "") || "/";
  if (ctx.env.AI && ctx.env.LB) {
    u.pathname = path;
    return api.fetch(new Request(u.toString(), ctx.request), ctx.env);
  }
  const target = "https://gcseasy-api.pandoplayzrblx.workers.dev" + path + u.search;
  const init = { method: ctx.request.method, headers: { "Content-Type": "application/json", "X-Forwarded-For": ctx.request.headers.get("CF-Connecting-IP") || "" } };
  if (ctx.request.method === "POST") init.body = await ctx.request.text();
  return fetch(target, init);
}
