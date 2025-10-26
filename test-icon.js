// Test der Base64-Icons im Manifest
const testIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAOklEQVR4nGNhQAMsLCz/oXhkM0iNJCv/0zHACiQ5yGpIdhC1A1YgTUKyHUjlQJvAtoPdBLQJaAfWJQAAOXURhHIXtOAAAAAASUVORK5CYII=";

console.log("Test Base64 Icon:", testIcon);
console.log("Icon Länge:", testIcon.length);

// Test ob Icon ladbar ist
const img = new Image();
img.onload = () => console.log("✅ Icon lädt korrekt");
img.onerror = () => console.log("❌ Icon defekt - kann nicht geladen werden");
img.src = testIcon;