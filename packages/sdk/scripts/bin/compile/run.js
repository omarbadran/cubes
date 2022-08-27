#!/usr/bin/env node

import fs, { statSync } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { versions, env } from 'process';
import { exec } from 'node:child_process';
import { build } from 'esbuild';
import glob from 'tiny-glob/sync.js';
import chokidar from 'chokidar';
import { yellow, cyan, bold, underline } from 'colorette';
import { options } from './cli.js';
import { getDependencies } from './pnp.js';

const dependencies = getDependencies();
let child;

/**
 * Log console messages after each successful build
 */
const logBuilt = (name, time, change = false) => {
  let items = [];

  const csep = '→';

  items.push(yellow(name));

  if (change) {
    items.push(change.event + ':' + change.path);
  }

  items.push('Built Successfuly');

  items.push(`(${time}ms)`);

  items = items.map((e) => [e, csep]).flat();

  items.pop();

  console.log(...items);
};

/**
 * Get an array of all files from a workspace
 */
const getWorkspaceFiles = (workspace) => {
  const config = workspace.config;

  const targetExts = ['.ts'].join(',');

  const pattern = config['src'] + `/**/*{${targetExts}}`;

  const files = glob(pattern, { cwd: workspace.packageLocation });

  return files;
};

/**
 * Build a workspace
 */
const buildWorkspace = async (name, workspace, change = false) => {
  const config = workspace.config;

  const files = getWorkspaceFiles(workspace);

  const buildConfig = {
    entryPoints: files,
    absWorkingDir: workspace.packageLocation,
    platform: 'node',
    target: `node${versions.node}`,
    bundle: false,
    format: 'esm',
    sourcemap: false,
    sourcesContent: false,
    treeShaking: true,
    outdir: config['outDir']
  };

  const start = Date.now();

  try {
    await build(buildConfig);
  } catch (error) {
    console.log(error);
  }

  const done = Date.now() - start;

  logBuilt(name, done, change);

  return done;
};

/**
 * Watch for changes in a workspace
 */
const watch = async (name, workspace) => {
  let sizes = {};

  const files = getWorkspaceFiles(workspace);

  for (const file of files) {
    sizes[file] = statSync(path.join(workspace.packageLocation, file))['size'];
  }

  const watcher = chokidar.watch(workspace.config['src'], {
    cwd: workspace.packageLocation,
    ignoreInitial: true
  });

  watcher.on('all', async (event, path, stats) => {
    let shouldRebuild = true;

    if (event == 'add') {
      sizes[path] = stats.size;
    }

    if (event == 'change' && stats) {
      if (stats.size === sizes[path]) {
        shouldRebuild = false;
      }
    }

    if (shouldRebuild) {
      sizes[path] = stats.size;

      await buildWorkspace(name, workspace, { event, path });
    }
  });

  return watcher;
};

/**
 * Build this workspaces and all of it's dependencies
 */
const run = async () => {
  for (const name in dependencies) {
    const workspace = dependencies[name];

    await buildWorkspace(name, workspace);

    if (options['watch']) {
      await watch(name, workspace);
    }
  }
};

try {
  await run();
} catch (error) {
  console.log(error);
}
