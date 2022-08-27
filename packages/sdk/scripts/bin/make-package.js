#!/usr/bin/env node
import path from 'path';
import fs from 'fs';

import { program } from 'commander';
import { fileURLToPath } from 'url';

import scan from 'scan-dir-recursive/sync/relative.js';

const dir = path.dirname(fileURLToPath(import.meta.url));

program.option('-n, --name <char>');

program.parse();

const options = program.opts();
const [workspace, name] = options.name.split('/');
const sample = path.join(dir, '../sample');

if (!['modules', 'apps', 'sdk'].includes(workspace) || name.length < 1) {
  throw new Error(
    'You must provide the workspace and the package name, for example yarn newpkg -n modules/hello'
  );
}

const location = `packages/${workspace}/${name}`;
const samples = scan(path.join(dir, '../sample'));

const files = samples.map((file) => {
  let content = fs.readFileSync(path.join(sample, file), 'utf-8');

  content = content.replace(/~name~/g, name);

  return { file, content };
});

if (!fs.existsSync(location)) {
  fs.mkdirSync(location);
} else {
  throw new Error('Package already exist');
}

for (const item of files) {
  const file = path.join(location, item.file);
  const dir = path.dirname(file);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(file, item.content);
}
