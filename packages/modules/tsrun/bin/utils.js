import fs from 'fs';
import path from 'path';
import { tmpdir } from 'os';

export const getConfig = (dir, filename) => {
  let config = {};

  const file = path.join(dir, filename);

  const exist = fs.existsSync(file);

  if (exist) {
    const content = fs.readFileSync(file, 'utf-8');
    config = JSON.parse(content);
  }

  let notAllowed = ['entryPoints', 'write', 'watch'];

  for (const item of notAllowed) {
    if (item in notAllowed) {
      throw new Error(`Propery [${item}] is not allowed in config file.`);
    }
  }

  return config;
};

export const getTempDir = () => fs.mkdtempSync(tmpdir() + path.sep);
