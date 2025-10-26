// REPARATUR-SCRIPT: Entfernt doppelte Samsung-Erkennung die mehrfache Chrome-Redirects verursacht

// Original-Problem: Zeile 4076-4103 enthält doppelte Samsung-Browser-Erkennung 
// die parallel zu der universellen Browser-Erkennung läuft und mehrfache Chrome-Redirects auslöst

// Diese Zeilen sollen entfernt/deaktiviert werden:
/*
                // SAMSUNG BROWSER-ERKENNUNG und angepasste Installation
                if (navigator.userAgent.includes('Samsung')) {
                    const userAgent = navigator.userAgent;
                    const isSamsungInternet = userAgent.includes('SamsungBrowser');
                    const isSamsungChrome = userAgent.includes('Samsung') && userAgent.includes('Chrome') && !userAgent.includes('SamsungBrowser');
                    const samsungVersion = userAgent.match(/SamsungBrowser\/(\d+)/);
                    
                    console.log('📱 SAMSUNG ERKANNT:', {
                        isSamsungInternet,
                        isSamsungChrome,
                        version: samsungVersion ? samsungVersion[1] : 'unknown',
                        fullUA: userAgent
                    });
                    
                    if (isSamsungInternet) {
                        console.log('🔵 SAMSUNG INTERNET BROWSER - Spezial-Behandlung');
                        handleSamsungInternet();
                    } else if (isSamsungChrome) {
                        console.log('🔴 SAMSUNG CHROME - Andere Technik');
                        handleSamsungChrome();
                    } else {
                        console.log('⚪ SAMSUNG UNBEKANNT - Standard-Behandlung');
                        handleUnknownSamsung();
                    }
                } else {
                    console.log('💻 NICHT-SAMSUNG - Standard Installation');
                    handleStandardInstallation();
                }
*/

// ERKLÄRUNG:
// Die doppelte Samsung-Erkennung sorgt dafür, dass sowohl die universelle Browser-Erkennung 
// als auch diese spezifische Samsung-Erkennung gleichzeitig laufen.
// Das führt zu mehrfachen Chrome-Redirects und hängender Installation.
// Nur die universelle Browser-Erkennung soll aktiv bleiben.