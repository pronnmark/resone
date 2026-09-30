// `npm run dev` that works on a fresh checkout: installs first if vite is missing.
// (bolt.diy interrupts its own setup `npm install` when it launches the dev server.)
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const run = (cmd, args) => spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' }).status ?? 1;

if (!existsSync('node_modules/vite/package.json')) {
  console.log('dependencies missing, running npm install…');
  if (run('npm', ['install', '--no-audit', '--no-fund']) !== 0) process.exit(1);
}
run('node', ['scripts/sizes.mjs']);
process.exit(run('node', ['node_modules/vite/bin/vite.js', '--host']));
