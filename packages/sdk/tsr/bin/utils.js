import fs from 'fs';
import path from 'path';
import { tmpdir } from 'os';
import { pathToFileURL } from 'url';

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

export const importMetaPlugin = (options) => {
  const filter = options?.filter ?? /\.[jt]s$/;

  return {
    name: 'replace-import-meta',
    setup({ onLoad }) {
      onLoad({ filter }, async (args) => {
        const contents = fs.readFileSync(args.path, 'utf8');
        const import_meta_url = JSON.stringify(pathToFileURL(args.path).href);
        const import_meta = JSON.stringify({ url: import_meta_url });
        return {
          loader: 'default',
          contents: contents
            .replace(/\bimport\.meta\b/g, import_meta)
            .replace(/\bimport\.meta\.url\b/g, import_meta_url)
            .replace(/\b__dirname\b/g, JSON.stringify(path.dirname(args.path)))
            .replace(/\b__filename\b/g, JSON.stringify(args.path))
        };
      });
    }
  };
};
