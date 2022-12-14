import fs from 'fs';
import path from 'path';
import url from 'url';
import glob from 'tiny-glob';
import type { App } from '@tinyhttp/app';
import { authorize } from './mw/authorize.js';

const dir = path.dirname(url.fileURLToPath(import.meta.url));

export const APIMethods = ['all', 'get', 'post', 'put', 'delete'] as const;
export type APIMethod = typeof APIMethods[number];

export const createRouter = async (app: App) => {
  let routesDir: fs.PathLike = path.join(dir, '/routes');
  let exist = fs.existsSync(routesDir);

  if (exist) {
    let files: string[] = await glob(routesDir + '**/*.js');

    for (let file of files) {
      let js = file.split('/routes/').pop();

      if (!js) {
        continue;
      }

      let path = js.replace('.js', '').replace('index', '');

      let mod = await import('./routes/' + js);

      for (let method of APIMethods) {
        if (method in mod) {
          let auth = mod?.auth;
          // add auth first
          if (auth && method in auth) {
            app[method](path, authorize(auth[method]), mod[method]);
          } else {
            app[method](path, mod[method]);
          }
        }
      }
    }
  }
};
