import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const viteExecutable = resolve(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');

if (!fs.existsSync(viteExecutable)) {
  console.error('\n[build] No se encontró Vite en node_modules.');
  console.error('[build] Ejecuta "npm install" o "pnpm install" en la raíz del proyecto para descargar las dependencias.');
  console.error(`[build] Ruta buscada: ${viteExecutable}`);
  process.exit(1);
}

const args = process.argv.slice(2);

const child = spawn(process.execPath, [viteExecutable, ...args], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PATH: process.env.PATH
  }
});

child.on('close', (code) => {
  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error('[build] Error al intentar ejecutar Vite:', error);
  process.exit(1);
});
