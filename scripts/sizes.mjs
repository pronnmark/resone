// Reads every JPEG's real size into src/data/sizes.json, so width/height are never written by hand.
// Zero dependencies on purpose: it must run before (and without) npm install finishing.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const m = buf[i + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
      return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  throw new Error('no JPEG size found');
}

const root = path.join(process.cwd(), 'public', 'img');
const out = {};
const walk = (d) => {
  for (const f of readdirSync(d).sort()) {
    const p = path.join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.jpe?g$/i.test(f)) {
      out[path.relative(root, p).replace(/\.jpe?g$/i, '').split(path.sep).join('/')] = jpegSize(readFileSync(p));
    }
  }
};
walk(root);
writeFileSync(path.join(process.cwd(), 'src', 'data', 'sizes.json'), JSON.stringify(out, null, 1) + '\n');
console.log(`sizes.json: ${Object.keys(out).length} images`);
