// Service Worker für Medizinische Sprachhilfe PWA
// Auto-Install Version

const CACHE_NAME = 'sprachhilfe-auto-v4.0-REAL-INSTALL-CHECK';
const urlsToCache = [
    './',
    './sprachhilfeauto.html',
    './pwa-manifest-auto.webmanifest'
];

// Install Event - Cache wichtige Ressourcen
self.addEventListener('install', event => {
    console.log('🔧 Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Service Worker: Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('✅ Service Worker: Install complete');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Service Worker: Install failed:', error);
            })
    );
});

// Activate Event - Alte Caches löschen
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Service Worker: Activation complete');
            return self.clients.claim();
        })
    );
});

// Fetch Event - Cache-First-Strategie für App Shell, Network-First für API-Calls
self.addEventListener('fetch', event => {
    const request = event.request;
    
    // Ignore non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Ignore external URLs
    if (!request.url.startsWith(self.location.origin)) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    console.log('📦 Service Worker: Serving from cache:', request.url);
                    return response;
                }
                
                // Cache miss - fetch from network
                console.log('🌐 Service Worker: Fetching from network:', request.url);
                return fetch(request).then(response => {
                    // Don't cache if response is not ok
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response for caching
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(request, responseToCache);
                            console.log('💾 Service Worker: Cached:', request.url);
                        });
                    
                    return response;
                });
            })
            .catch(error => {
                console.error('❌ Service Worker: Fetch failed:', error);
                // You could return a fallback page here
                throw error;
            })
    );
});

// Message Event - Kommunikation mit der App
self.addEventListener('message', event => {
    console.log('💬 Service Worker: Received message:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            type: 'VERSION',
            version: CACHE_NAME
        });
    }
});

// Background Sync für Offline-Funktionalität (optional)
self.addEventListener('sync', event => {
    console.log('🔄 Service Worker: Background sync:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Hier könnten Sie Offline-Daten synchronisieren
            Promise.resolve()
        );
    }
});

console.log('🎯 Service Worker: Registered and ready for auto-install PWA');