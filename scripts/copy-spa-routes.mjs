#!/usr/bin/env node
import { existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROUTES = ['projects', 'teaching'];

const distRoot = 'dist';
const projectDir = readdirSync(distRoot).find((name) =>
  existsSync(join(distRoot, name, 'browser', 'index.html')),
);

if (!projectDir) {
  console.error('copy-spa-routes: could not find dist/<project>/browser/index.html');
  process.exit(1);
}

const browserDir = join(distRoot, projectDir, 'browser');
const indexHtml = join(browserDir, 'index.html');

for (const route of ROUTES) {
  const routeDir = join(browserDir, route);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(indexHtml, join(routeDir, 'index.html'));
  console.log(`copy-spa-routes: wrote ${route}/index.html`);
}
