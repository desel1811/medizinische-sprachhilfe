// GitHub Update Verification Script
// Führe diesen Code in der Browser-Console aus auf deiner GitHub Pages URL

console.log('🔍 GitHub Pages Update Verification');
console.log('📅 Check Date:', new Date().toLocaleString('de-DE'));

// 1. Prüfe Manifest-Version (Icon-Fix)
fetch('./pwa-manifest-auto.webmanifest?' + Date.now())
  .then(response => response.json())
  .then(manifest => {
    console.log('\n✅ Manifest geladen von GitHub Pages');
    
    // Prüfe Icon-Größen
    const iconSizes = manifest.icons.map(icon => icon.sizes);
    console.log('📱 Icon-Größen:', iconSizes);
    
    // Prüfe Icon-Typ (sollte SVG sein, nicht PNG)
    const iconTypes = manifest.icons.map(icon => icon.type);
    console.log('🖼️ Icon-Typen:', iconTypes);
    
    // Prüfe erstes Icon (sollte SVG Base64 sein)
    const firstIcon = manifest.icons[0];
    if (firstIcon.src.includes('image/svg+xml')) {
      console.log('✅ NEUE Icons: SVG Base64 erkannt - Update erfolgreich!');
    } else if (firstIcon.src.includes('iVBORw0KGgoAAAANSUhEUgAAAA0')) {
      console.log('❌ ALTE Icons: Defekte PNG noch vorhanden - Update fehlgeschlagen!');
    }
    
    console.log('\n🎯 Icon-Status:');
    manifest.icons.forEach((icon, i) => {
      console.log(`Icon ${i+1}: ${icon.sizes} (${icon.type})`);
      if (icon.src.length > 1000) {
        console.log(`✅ Icon ${i+1}: Base64 groß genug (${icon.src.length} chars)`);
      } else {
        console.log(`❌ Icon ${i+1}: Base64 zu klein (${icon.src.length} chars)`);
      }
    });
  })
  .catch(error => {
    console.log('❌ Manifest-Fehler:', error);
  });

// 2. Prüfe HTML-Version (Popup-Entfernung)
fetch('./sprachhilfeauto.html?' + Date.now())
  .then(response => response.text())
  .then(html => {
    console.log('\n✅ HTML geladen von GitHub Pages');
    
    // Prüfe auf entfernte Funktionen
    const removedFunctions = [
      'showMobileInstallManual',
      'showAndroidInstallGuide', 
      'showInstallWarning',
      'showMobileInstallInstructions',
      'forceAndroidInstall'
    ];
    
    console.log('\n🔍 Popup-Funktionen Check:');
    removedFunctions.forEach(func => {
      const regex = new RegExp(`function\\s+${func}\\s*\\(`, 'g');
      const matches = html.match(regex);
      
      if (matches && matches.length > 0) {
        console.log(`❌ ${func}: NOCH VORHANDEN - Update fehlgeschlagen!`);
      } else {
        console.log(`✅ ${func}: Entfernt`);
      }
    });
    
    // Prüfe auf Kommentare (sollten vorhanden sein)
    if (html.includes('// showAndroidInstallGuide(); // Deaktiviert: Keine Anleitung mehr')) {
      console.log('✅ Kommentierte Deaktivierung gefunden - Update erfolgreich!');
    } else {
      console.log('❌ Deaktivierungs-Kommentare nicht gefunden');
    }
  })
  .catch(error => {
    console.log('❌ HTML-Fehler:', error);
  });

// 3. Cache-Busting Test
console.log('\n⚡ Cache-Busting aktiviert - Dateien werden frisch geladen');

// 4. Service Worker Check
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log('\n⚙️ Service Worker Status:');
    console.log('Registrierungen:', registrations.length);
    
    registrations.forEach((reg, i) => {
      console.log(`SW ${i+1}: ${reg.scope}`);
    });
  });
}

setTimeout(() => {
  console.log('\n🏁 GitHub Update Check komplett!');
  console.log('📝 Ergebnis: Siehe Details oben');
}, 3000);