// Test der neuen Icons für automatische Handy-Installation
console.log('🔍 PWA Icon-Test für automatische Handy-Installation');

// 1. Manifest laden und prüfen
fetch('./pwa-manifest-auto.webmanifest')
  .then(response => response.json())
  .then(manifest => {
    console.log('✅ Manifest geladen:', manifest.name);
    console.log('📱 Icons im Manifest:', manifest.icons.length);
    
    // Teste jedes Icon
    manifest.icons.forEach((icon, index) => {
      console.log(`\n🖼️ Icon ${index + 1}:`);
      console.log('- Größe:', icon.sizes);
      console.log('- Typ:', icon.type);
      console.log('- Purpose:', icon.purpose);
      
      // Test ob Icon ladbar ist
      const img = new Image();
      img.onload = () => {
        console.log(`✅ Icon ${index + 1} (${icon.sizes}) erfolgreich geladen`);
        console.log(`📐 Echte Größe: ${img.width}x${img.height}`);
      };
      img.onerror = () => {
        console.log(`❌ Icon ${index + 1} (${icon.sizes}) FEHLER beim Laden`);
      };
      img.src = icon.src;
    });
  })
  .catch(error => {
    console.log('❌ Manifest-Fehler:', error);
  });

// 2. PWA Install-Kriterien für Handy prüfen
console.log('\n🎯 PWA Install-Kriterien für automatische Handy-Installation:');

// Manifest Link prüfen
const manifestLink = document.querySelector('link[rel="manifest"]');
console.log('📋 Manifest verlinkt:', !!manifestLink);
if (manifestLink) {
  console.log('📋 Manifest URL:', manifestLink.href);
}

// Service Worker prüfen
console.log('⚙️ Service Worker verfügbar:', 'serviceWorker' in navigator);

// HTTPS/localhost prüfen
console.log('🔒 HTTPS/localhost:', window.location.protocol === 'https:' || window.location.hostname === 'localhost');

// 3. Mobile Detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isAndroid = /Android/.test(navigator.userAgent);
const isChrome = /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent);

console.log('\n📱 Device Detection:');
console.log('- Mobile:', isMobile);
console.log('- Android:', isAndroid);
console.log('- Chrome:', isChrome);

// 4. Test der automatischen Icon-Erstellung
if (isAndroid && isChrome) {
  console.log('\n🚀 Android Chrome erkannt - Icons sollten automatisch erstellt werden!');
  
  // Prüfe ob beforeinstallprompt Event kommt
  let installPromptReceived = false;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    installPromptReceived = true;
    console.log('✅ beforeinstallprompt Event empfangen - PWA installierbar!');
    console.log('📱 Icons werden automatisch auf Startbildschirm erstellt');
  });
  
  // Nach 3 Sekunden prüfen
  setTimeout(() => {
    if (!installPromptReceived) {
      console.log('⚠️ beforeinstallprompt noch nicht empfangen');
      console.log('💡 Besuche die Seite mehrmals oder warte länger');
    }
  }, 3000);
  
} else {
  console.log('\n💻 Desktop oder anderer Browser - Native Installation verfügbar');
}

// 5. Manifest Display-Mode prüfen
if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
  console.log('\n🎉 PWA bereits installiert und läuft im Standalone-Modus!');
} else {
  console.log('\n🌐 PWA läuft im Browser-Modus - noch nicht installiert');
}

console.log('\n🏁 Icon-Test komplett! Siehe Ergebnisse oben.');
console.log('📱 Bei erfolgreicher Installation wird automatisch ein Icon auf dem Handy-Startbildschirm erstellt!');