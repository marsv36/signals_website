const fs = require('fs');
const path = require('path');

// Directory containing product pages
const productsDir = path.join(__dirname, 'products');
const outputFile = path.join(productsDir, '_index.html');

// Function to extract YAML-style front matter from HTML files
function extractFrontMatter(content) {
  const match = content.match(/<!--\s*([\s\S]*?)\s*-->/);
  if (!match) return null;
  
  const frontMatter = {};
  const lines = match[1].trim().split('\n');
  
  lines.forEach(line => {
    const [key, value] = line.split(':').map(part => part.trim());
    if (key && value) {
      frontMatter[key] = value;
    }
  });
  
  return frontMatter;
}

// Read all product files
fs.readdir(productsDir, (err, files) => {
  if (err) {
    console.error('Error reading products directory:', err);
    return;
  }
  
  const products = [];
  
  // Filter for HTML files and exclude _index.html
  const productFiles = files.filter(file => 
    file.endsWith('.html') && file !== '_index.html'
  );
  
  // Process each product file
  productFiles.forEach(file => {
    const filePath = path.join(productsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const frontMatter = extractFrontMatter(content);
    
    if (frontMatter && frontMatter.title) {
      products.push({
        title: frontMatter.title,
        slug: frontMatter.slug || file.replace('.html', ''),
        og: frontMatter.og || '',
        file: file
      });
    }
  });
  
  // Generate the index HTML
  const indexContent = `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Produkty | Signals</title>
  <meta name="description" content="Kompletní katalog produktů a služeb společnosti Signals">
  <link rel="stylesheet" href="../css/normalize.css">
  <link rel="stylesheet" href="../css/signals.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/utilities.min.css">
</head>
<body>
  <header>
    <nav class="container mx-auto">
      <a href="../index.html" class="logo">
        <img src="../img/logo.svg" alt="Signals logo" width="120" height="40">
      </a>
      <button class="mobile-menu-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
        <li><a href="../index.html">Domů</a></li>
        <li><a href="../products/_index.html" class="active">Produkty</a></li>
        <li><a href="../index.html#sluzby">Služby</a></li>
        <li><a href="../index.html#kontakt">Kontakt</a></li>
      </ul>
    </nav>
  </header>

  <main class="container mx-auto py-8">
    <h1>Naše produkty</h1>
    
    <div class="product-grid">
      ${products.map(product => `
        <div class="product-card">
          <a href="${product.file}">
            ${product.og ? `<img src="../${product.og}" alt="${product.title}" loading="lazy">` : ''}
            <h2>${product.title}</h2>
          </a>
        </div>
      `).join('')}
    </div>
  </main>

  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto">
      <div class="footer-grid">
        <div class="footer-col">
          <img src="../img/logo.svg" alt="Signals logo" width="120" height="40" class="mb-4">
          <p>Profesionální řešení pro vaše podnikání</p>
        </div>
        <div class="footer-col">
          <h3>Kontakt</h3>
          <address>
            Signals s.r.o.<br>
            Ulice 123<br>
            120 00 Praha 2<br>
            <a href="mailto:signals@signals.cz">signals@signals.cz</a><br>
            <a href="tel:+420123456789">+420 123 456 789</a>
          </address>
        </div>
        <div class="footer-col">
          <h3>Odkazy</h3>
          <ul>
            <li><a href="../index.html">Domů</a></li>
            <li><a href="../products/_index.html">Produkty</a></li>
            <li><a href="../index.html#sluzby">Služby</a></li>
            <li><a href="../index.html#kontakt">Kontakt</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 text-center">
        <p>&copy; ${new Date().getFullYear()} Signals s.r.o. Všechna práva vyhrazena.</p>
      </div>
    </div>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>`;

  // Write the index file
  fs.writeFileSync(outputFile, indexContent);
  console.log(`Generated products index with ${products.length} products.`);
}); 