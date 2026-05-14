import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const outDir = resolve(root, 'out');
const docsDir = resolve(root, 'docs');

if (!existsSync(outDir)) {
  throw new Error('Expected Next export output at ./out');
}

rmSync(docsDir, { recursive: true, force: true });
mkdirSync(docsDir, { recursive: true });
cpSync(outDir, docsDir, { recursive: true });
writeFileSync(resolve(docsDir, '.nojekyll'), '');
console.log('Exported static site to docs/');
