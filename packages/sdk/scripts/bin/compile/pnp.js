import { env } from 'node:process';
import { existsSync, readFileSync } from 'node:fs';
import path, { join } from 'node:path';
import module from 'node:module';

const pnpApi = module.findPnpApi(env.PROJECT_CWD);

/**
 * Get a list of buildable workspaces
 */
export const getWorkspaces = () => {
  let locators = pnpApi.getDependencyTreeRoots();

  let workspaces = {};

  for (const locator of locators) {
    workspaces[locator.name] = pnpApi.getPackageInformation(locator);
  }

  for (const name in workspaces) {
    let ws = workspaces[name];

    const config = path.join(ws.packageLocation, 'build.config.json');

    if (existsSync(config)) {
      ws.config = JSON.parse(readFileSync(config, 'utf-8'));

      for (let p of ['src', 'outDir']) {
        ws.config[p] = path.join(ws.packageLocation, ws.config[p]);
      }
    }
  }

  return workspaces;
};

export const getDependencies = () => {
  let dependencies = {};

  const workspaces = getWorkspaces();
  const current = workspaces[env.npm_package_name];

  for (const name in workspaces) {
    let ws = workspaces[name];

    if (current.packageDependencies.has(name) && ws.config) {
      dependencies[name] = ws;
    }
  }

  return dependencies;
};
