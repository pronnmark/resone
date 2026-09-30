// Reads every JPEG's real size into src/data/sizes.json, so width/height are never written by hand.
import { imageSize } from 'image-size';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'public', 'img');
const out = {};
const walk = (d) => {
  for (const f of readdirSync(d).sort()) {
    const p = path.join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.jpe?g$/i.test(f)) {
      const { width, height } = imageSize(readFileSync(p));
      out[path.relative(root, p).replace(/\.jpe?g$/i, '').split(path.sep).join('/')] = [width, height];
    }
  }
};
walk(root);
writeFileSync(path.join(process.cwd(), 'src', 'data', 'sizes.json'), JSON.stringify(out, null, 1) + '\n');
console.log(`sizes.json: ${Object.keys(out).length} images`);
