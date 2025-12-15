import opentype from 'opentype.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert font to Three.js JSON format
function convertToThreeJsFont(font) {
  const scale = (100000) / ((font.unitsPerEm || 2048) * 72);
  const result = {
    glyphs: {},
    familyName: font.names.fontFamily?.en || font.names.fontFamily || 'Unknown',
    ascender: Math.round(font.ascender * scale),
    descender: Math.round(font.descender * scale),
    underlinePosition: Math.round((font.tables.post?.underlinePosition || 0) * scale),
    underlineThickness: Math.round((font.tables.post?.underlineThickness || 0) * scale),
    boundingBox: {
      xMin: Math.round(font.tables.head.xMin * scale),
      yMin: Math.round(font.tables.head.yMin * scale),
      xMax: Math.round(font.tables.head.xMax * scale),
      yMax: Math.round(font.tables.head.yMax * scale)
    },
    resolution: 1000,
    original_font_information: font.names
  };

  // Convert each glyph
  for (let i = 0; i < font.glyphs.length; i++) {
    const glyph = font.glyphs.get(i);
    if (glyph.unicode !== undefined) {
      const token = String.fromCharCode(glyph.unicode);
      const glyphData = {
        ha: Math.round(glyph.advanceWidth * scale),
        x_min: glyph.xMin !== undefined ? Math.round(glyph.xMin * scale) : 0,
        x_max: glyph.xMax !== undefined ? Math.round(glyph.xMax * scale) : 0,
        o: ''
      };

      // Convert path commands
      if (glyph.path) {
        glyph.path.commands.forEach(cmd => {
          if (cmd.type === 'M') {
            glyphData.o += `m ${Math.round(cmd.x * scale)} ${Math.round(cmd.y * scale)} `;
          } else if (cmd.type === 'L') {
            glyphData.o += `l ${Math.round(cmd.x * scale)} ${Math.round(cmd.y * scale)} `;
          } else if (cmd.type === 'C') {
            glyphData.o += `b ${Math.round(cmd.x1 * scale)} ${Math.round(cmd.y1 * scale)} ${Math.round(cmd.x2 * scale)} ${Math.round(cmd.y2 * scale)} ${Math.round(cmd.x * scale)} ${Math.round(cmd.y * scale)} `;
          } else if (cmd.type === 'Q') {
            glyphData.o += `q ${Math.round(cmd.x1 * scale)} ${Math.round(cmd.y1 * scale)} ${Math.round(cmd.x * scale)} ${Math.round(cmd.y * scale)} `;
          } else if (cmd.type === 'Z') {
            glyphData.o += 'z ';
          }
        });
      }

      result.glyphs[token] = glyphData;
    }
  }

  return result;
}

async function main() {
  const fontPath = process.argv[2] || path.join(__dirname, '../public/fonts/JetBrainsMono-Bold.ttf');
  
  // Extract font name from path
  const fontName = path.basename(fontPath, path.extname(fontPath));
  const outputPath = path.join(path.dirname(fontPath), `${fontName}.json`);

  console.log('Loading font from:', fontPath);

  try {
    const font = await opentype.load(fontPath);
    console.log('Font loaded successfully:', font.names.fontFamily);

    const threeJsFont = convertToThreeJsFont(font);
    
    fs.writeFileSync(outputPath, JSON.stringify(threeJsFont));
    console.log('Font converted and saved to:', outputPath);
  } catch (error) {
    console.error('Error converting font:', error);
  }
}

main();
