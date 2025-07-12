const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const ejs = require('ejs');

// Static site generator for GitHub Pages
class StaticSiteGenerator {
  constructor() {
    this.app = express();
    this.outputDir = './dist';
    this.routes = [
      { path: '/', file: 'index.html', template: 'index', data: { title: 'Netball Thing', savedGame: null } },
      { path: '/results', file: 'results.html', template: 'results', data: { title: 'Game Results', games: [] } }
    ];
  }

  async init() {
    // Setup express app
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, 'views'));
    
    // Create output directory
    await this.ensureDir(this.outputDir);
    
    // Copy static assets
    await this.copyStaticAssets();
    
    // Generate HTML pages
    await this.generatePages();
    
    console.log('✅ Static site generated successfully!');
  }

  async ensureDir(dir) {
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
    }
  }

  async copyStaticAssets() {
    console.log('📁 Copying static assets...');
    
    // Copy public directory
    await this.copyDir('./public', `${this.outputDir}/public`);
    
    // Create a simple API simulator for demo purposes
    const demoData = {
      games: [
        {
          id: 1,
          date: '2025-01-15',
          homeTeam: 'Demo Team A',
          awayTeam: 'Demo Team B',
          homeScore: { q1: 5, q2: 7, q3: 6, q4: 8, total: 26 },
          awayScore: { q1: 4, q2: 6, q3: 8, q4: 7, total: 25 }
        }
      ]
    };
    
    await fs.writeFile(
      `${this.outputDir}/api.js`,
      `// Demo data for GitHub Pages\nwindow.DEMO_DATA = ${JSON.stringify(demoData, null, 2)};`
    );
  }

  async copyDir(src, dest) {
    await this.ensureDir(dest);
    const entries = await fs.readdir(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        await this.copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }

  async generatePages() {
    console.log('📄 Generating HTML pages...');
    
    for (const route of this.routes) {
      try {
        const html = await ejs.renderFile(
          path.join(__dirname, 'views', `${route.template}.ejs`),
          route.data
        );
        
        // Modify HTML for static hosting
        const modifiedHtml = this.modifyForStatic(html);
        
        await fs.writeFile(
          path.join(this.outputDir, route.file),
          modifiedHtml
        );
        
        console.log(`  ✓ Generated ${route.file}`);
      } catch (error) {
        console.error(`❌ Error generating ${route.file}:`, error.message);
      }
    }
  }

  modifyForStatic(html) {
    // Add base tag for GitHub Pages
    html = html.replace(
      '<head>',
      '<head>\n  <base href="/netball-thing/">'
    );
    
    // Add demo data script
    html = html.replace(
      '</head>',
      '  <script src="api.js"></script>\n</head>'
    );
    
    // Replace form actions for static demo
    html = html.replace(
      /action="[^"]*"/g,
      'action="javascript:void(0)" onsubmit="handleStaticSubmit(event)"'
    );
    
    // Add static demo script
    const staticScript = `
<script>
// Static demo functionality for GitHub Pages
function handleStaticSubmit(event) {
  event.preventDefault();
  alert('This is a static demo. In the full application, this would save your game data!');
}

// Load demo data if available
if (window.DEMO_DATA && window.location.pathname.includes('results')) {
  // This would populate the results page with demo data
  console.log('Demo data loaded:', window.DEMO_DATA);
}
</script>`;
    
    html = html.replace('</body>', staticScript + '\n</body>');
    
    return html;
  }
}

// Run the generator
if (require.main === module) {
  const generator = new StaticSiteGenerator();
  generator.init().catch(console.error);
}

module.exports = StaticSiteGenerator;
