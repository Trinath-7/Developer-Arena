const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let js = fs.readFileSync('js/bundle.js', 'utf8');

// Add alerts to catch block
js = js.replace(/UI\.showError\(error\.message\);/g, 'UI.showError(error.message); alert("API Error: " + error.message + "\\nIf this says Failed to fetch, you might be offline or the API key is invalid.");');

// Replace script tag
html = html.replace(/<script src="js\/bundle.js"><\/script>/, `<script>\n${js}\n</script>`);

fs.writeFileSync('dashboard-fixed.html', html);
