const V = "gcseasy-20261022094618", PRE = ["/", "/biology.html", "/chemistry.html", "/citizenship.html", "/combined-science.html", "/english-language.html", "/english-literature.html", "/french.html", "/geography.html", "/maths.html", "/physics.html", "/privacy.html", "/resources.html", "/tools.html", "/shared/account.js", "/shared/bank.js", "/shared/config.js", "/shared/guide.js", "/shared/resources.js", "/shared/site.css", "/shared/site.js", "/shared/study.css", "/shared/study.js", "/icon.svg", "/icon-192.png", "/manifest.webmanifest"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(V).then((c) => Promise.all(PRE.map((u) => c.add(new Request(u, { cache: "reload" })).catch(() => {})))).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.pathname.startsWith("/api/") || u.pathname.startsWith("/admin")) return;
  const font = /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if (u.origin !== location.origin && !font) return;
  // site pages and scripts: network first so updates show straight away; saved copy when offline
  if (r.mode === "navigate" || (u.origin === location.origin && !/\.(png|svg|webmanifest)$/.test(u.pathname))) {
    e.respondWith(fetch(r).then((res) => { if (res.ok) { const c = res.clone(); caches.open(V).then((ca) => ca.put(r, c)); } return res; })
      .catch(() => caches.match(r, { ignoreSearch: true }).then((m) => m || (r.mode === "navigate" ? caches.match("/") : Response.error()))));
    return;
  }
  e.respondWith(caches.match(r).then((m) => { const f = fetch(r).then((res) => { if (res.ok || res.type === "opaque") { const c = res.clone(); caches.open(V).then((ca) => ca.put(r, c)); } return res; }).catch(() => m); return m || f; }));
});
