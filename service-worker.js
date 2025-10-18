/* Simple cache-first service worker for the portfolio */
const CACHE_NAME = 'arpit-portfolio-v1'
const PRECACHE = [
  './',
  './index.html',
  './styles.css',
  './main.js',
  './manifest.webmanifest',
  './1755945970807.png',
  './Arpit_Resume.pdf'
]

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached
      return fetch(req).then(res => {
        const copy = res.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy))
        return res
      }).catch(() => caches.match('./index.html'))
    })
  )
})
