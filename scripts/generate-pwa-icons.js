// Script to generate compliant PNG icons (192x192, 512x512, apple-touch-icon 180x180, and maskable 512x512)
// Using pure Node.js built-in zlib and fs
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, drawPixel) {
  // width and height as 4-byte big-endian
  const IHDR = Buffer.alloc(13);
  IHDR.writeUInt32BE(width, 0);
  IHDR.writeUInt32BE(height, 4);
  IHDR[8] = 8; // bit depth: 8
  IHDR[9] = 6; // color type: 6 (RGBA)
  IHDR[10] = 0; // compression method: 0
  IHDR[11] = 0; // filter method: 0
  IHDR[12] = 0; // interlace method: 0

  // Scanlines: (1 byte filter (0 = None) + 4 bytes RGBA per pixel) * height
  const rowLength = 1 + width * 4;
  const rawData = Buffer.alloc(rowLength * height);

  for (let y = 0; y < height; y++) {
    const rowStart = y * rowLength;
    rawData[rowStart] = 0; // filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowStart + 1 + x * 4;
      const [r, g, b, a] = drawPixel(x, y, width, height);
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const IDAT_data = zlib.deflateSync(rawData, { level: 9 });

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = data.length;
    const chunk = Buffer.alloc(4 + 4 + len + 4);
    chunk.writeUInt32BE(len, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);
    const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = crc32(typeAndData);
    chunk.writeUInt32BE(crc, 8 + len);
    return chunk;
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrChunk = makeChunk('IHDR', IHDR);
  const idatChunk = makeChunk('IDAT', IDAT_data);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Color palette: Regal Black (#0c0c0d), Luxury Satin Gold (#d4af37), Radiant Highlight (#fff3be)
function renderIconPixel(x, y, w, h, isMaskable = false) {
  const cx = w / 2;
  const cy = h / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const maxR = Math.min(w, h) / 2;

  // Background deep dark radial
  const bgGrad = 12 + Math.floor((1 - dist / maxR) * 14);
  let r = Math.min(25, Math.max(8, bgGrad));
  let g = Math.min(24, Math.max(8, bgGrad));
  let b = Math.min(28, Math.max(10, bgGrad));
  let a = 255;

  const safeRadius = isMaskable ? maxR * 0.72 : maxR * 0.88;
  const innerRadius = safeRadius * 0.94;

  // Golden Outer Circular Crest Ring
  if (dist <= safeRadius && dist >= innerRadius) {
    // Gold gradient
    return [212, 175, 55, 255]; // #d4af37
  }

  // Inner subtle secondary gold border
  const ring2Out = innerRadius - (w > 300 ? 6 : 3);
  const ring2In = ring2Out - (w > 300 ? 2 : 1);
  if (dist <= ring2Out && dist >= ring2In) {
    return [170, 130, 34, 180];
  }

  // Heraldic Crown on top
  const crownY = cy - safeRadius * 0.52;
  if (y > crownY - (w > 300 ? 20 : 8) && y < crownY + (w > 300 ? 15 : 6)) {
    if (Math.abs(dx) < (w > 300 ? 40 : 16)) {
      return [245, 228, 171, 255];
    }
  }

  // Central Monogram Letters 'F' and 'I'
  const letterYTop = cy - safeRadius * 0.25;
  const letterYBot = cy + safeRadius * 0.45;
  const strokeW = w > 300 ? 22 : (w > 180 ? 10 : 8);

  // Left letter 'F'
  const fXLeft = cx - safeRadius * 0.42;
  const fXRight = cx - safeRadius * 0.05;
  if (x >= fXLeft && x <= fXLeft + strokeW && y >= letterYTop && y <= letterYBot) {
    return [212, 175, 55, 255]; // vertical stem
  }
  if (y >= letterYTop && y <= letterYTop + strokeW && x >= fXLeft && x <= fXRight) {
    return [255, 243, 190, 255]; // top bar
  }
  const fMidY = cy + safeRadius * 0.05;
  if (y >= fMidY && y <= fMidY + strokeW * 0.85 && x >= fXLeft && x <= fXRight - (w > 300 ? 15 : 6)) {
    return [212, 175, 55, 255]; // middle bar
  }

  // Right letter 'I'
  const iX = cx + safeRadius * 0.28;
  if (x >= iX - strokeW / 2 && x <= iX + strokeW / 2 && y >= letterYTop && y <= letterYBot) {
    return [212, 175, 55, 255]; // main stem
  }
  // I top serif
  if (y >= letterYTop && y <= letterYTop + strokeW * 0.7 && x >= iX - strokeW * 1.3 && x <= iX + strokeW * 1.3) {
    return [255, 243, 190, 255];
  }
  // I bottom serif
  if (y >= letterYBot - strokeW * 0.7 && y <= letterYBot && x >= iX - strokeW * 1.3 && x <= iX + strokeW * 1.3) {
    return [212, 175, 55, 255];
  }

  // Central gold diamond separator
  const diaDist = Math.abs(dx - (safeRadius * 0.08)) + Math.abs(dy - (safeRadius * 0.1));
  if (diaDist < (w > 300 ? 14 : 6)) {
    return [255, 243, 190, 255];
  }

  // Lower foundation bar
  const barY = cy + safeRadius * 0.60;
  if (y >= barY && y <= barY + (w > 300 ? 6 : 3) && Math.abs(dx) < safeRadius * 0.45) {
    return [212, 175, 55, 255];
  }

  return [r, g, b, a];
}

const publicDir = path.resolve(process.cwd(), 'public');

// Generate 192x192
fs.writeFileSync(
  path.join(publicDir, 'pwa-192x192.png'),
  createPng(192, 192, (x, y, w, h) => renderIconPixel(x, y, w, h, false))
);

// Generate 512x512
fs.writeFileSync(
  path.join(publicDir, 'pwa-512x512.png'),
  createPng(512, 512, (x, y, w, h) => renderIconPixel(x, y, w, h, false))
);

// Generate 512x512 maskable (with 15% safe zone margin per guidelines)
fs.writeFileSync(
  path.join(publicDir, 'pwa-maskable-512x512.png'),
  createPng(512, 512, (x, y, w, h) => renderIconPixel(x, y, w, h, true))
);

// Generate apple-touch-icon.png (180x180)
fs.writeFileSync(
  path.join(publicDir, 'apple-touch-icon.png'),
  createPng(180, 180, (x, y, w, h) => renderIconPixel(x, y, w, h, false))
);

console.log('Successfully generated all compliant PWA PNG icons in /public!');
