const CACHE='rfid-dashboard-v1';
const ROOT=new URL('./',self.location.href);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','index.html','style.css','app.js'])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('rfid-dashboard-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const u=new URL(event.request.url);if(event.request.method!=='GET'||u.origin!==ROOT.origin||!u.pathname.startsWith(ROOT.pathname))return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));});
