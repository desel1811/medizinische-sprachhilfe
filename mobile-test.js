// Mobile PWA Install Test Script
// Öffne http://localhost:8080/sprachhilfeauto.html
// Füge diesen Code in die Browser-Konsole ein (F12)

console.log('🚀 Mobile PWA Install Test gestartet');

// 1. User Agent prüfen
console.log('📱 Current User Agent:', navigator.userAgent);

// 2. PWA Install-Kriterien prüfen
console.log('🔍 PWA Installability Check:');
console.log('- Service Worker:', 'serviceWorker' in navigator);
console.log('- HTTPS/localhost:', window.location.protocol);
console.log('- Manifest:', document.querySelector('link[rel="manifest"]'));

// 3. Install-Button Status prüfen
const installBtn = document.querySelector('.desktop-install-btn');
console.log('🔘 Install Button vorhanden:', !!installBtn);
if (installBtn) {
    console.log('🔘 Button Text:', installBtn.textContent);
}

// 4. deferredPrompt Status prüfen
console.log('⏳ deferredPrompt verfügbar:', !!window.deferredPrompt);

// 5. Mobile Detection Test
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isAndroid = /Android/.test(navigator.userAgent);
const isChrome = /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent);

console.log('📱 Device Detection:');
console.log('- Mobile:', isMobile);
console.log('- Android:', isAndroid);
console.log('- Chrome:', isChrome);

// 6. Simuliere beforeinstallprompt Event
console.log('🎯 Teste Install-Event...');

// Mock eines beforeinstallprompt Events
const mockPromptEvent = {
    preventDefault: () => console.log('✅ Event preventDefault called'),
    prompt: () => {
        console.log('✅ Install prompt triggered');
        return Promise.resolve({ outcome: 'accepted' });
    }
};

// Simuliere Event
window.dispatchEvent(new CustomEvent('beforeinstallprompt', { detail: mockPromptEvent }));

// 7. Teste manuellen Install-Button Klick
if (installBtn) {
    console.log('🔘 Teste Install-Button...');
    setTimeout(() => {
        installBtn.click();
        console.log('✅ Install-Button geklickt');
    }, 2000);
} else {
    console.log('❌ Kein Install-Button gefunden');
}

// 8. Service Worker Status
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
        console.log('✅ Service Worker bereit:', registration.scope);
    });
}

console.log('🏁 Mobile PWA Test komplett - siehe Ergebnisse oben');