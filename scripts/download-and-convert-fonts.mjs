import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonts to download from Google Fonts (direct .ttf URLs)
const FONTS_TO_DOWNLOAD = [
  {
    name: 'Roboto-Bold',
    url: 'https://github.com/google/roboto/raw/main/fonts/Roboto_Bold.ttf',
  },
  {
    name: 'Montserrat-Bold',
    url: 'https://github.com/JetBrains/JetBrainsMono/releases/download/v2.304/JetBrainsMono-Bold.ttf',
  },
  {
    name: 'SpaceMono-Bold',
    url: 'https://github.com/google/fonts/raw/main/ofl/spacemono/SpaceMono-Bold.ttf',
  },
  {
    name: 'IBMPlexMono-Bold',
    url: 'https://github.com/IBM/plex/releases/download/v6.2.0/TrueType.zip',
  },
  {
    name: 'CourierPrime-Bold',
    url: 'https://github.com/google/fonts/raw/main/ofl/courierprimedev/CourierPrime-Bold.ttf',
  },
];

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    https
      .get(url, (response) => {
        // Handle redirects
        if (response.statusCode === 301 || response.statusCode === 302) {
          downloadFile(response.headers.location, filename)
            .then(resolve)
            .catch(reject);
          return;
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', (err) => {
        fs.unlink(filename, () => reject(err));
      });
  });
}

async function main() {
  const tempDir = path.join(__dirname, '.temp-fonts');
  const publicFontsDir = path.join(__dirname, '..', 'public', 'fonts');

  // Create directories
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
  if (!fs.existsSync(publicFontsDir)) fs.mkdirSync(publicFontsDir, { recursive: true });

  console.log('🔽 Downloading fonts...\n');

  for (const font of FONTS_TO_DOWNLOAD) {
    try {
      const tempFile = path.join(tempDir, `${font.name}.ttf`);
      console.log(`Downloading ${font.name}...`);
      await downloadFile(font.url, tempFile);
      console.log(`✓ Downloaded ${font.name}\n`);

      // Convert to Three.js format
      console.log(`Converting ${font.name} to Three.js format...`);
      try {
        execSync(
          `node ${path.join(__dirname, 'convert-font.mjs')} ${tempFile}`,
          { stdio: 'inherit' }
        );
        console.log(`✓ Converted ${font.name}\n`);
      } catch (err) {
        console.error(`✗ Failed to convert ${font.name}:`, err.message);
      }
    } catch (err) {
      console.error(`✗ Failed to download ${font.name}:`, err.message);
    }
  }

  // Cleanup
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
  }

  console.log('✓ Font conversion complete!');
  console.log(`\nConverted fonts are in: ${publicFontsDir}`);
  console.log('\nAvailable fonts:');
  fs.readdirSync(publicFontsDir)
    .filter((f) => f.endsWith('.json'))
    .forEach((f) => console.log(`  - ${f}`));
}

main().catch(console.error);
