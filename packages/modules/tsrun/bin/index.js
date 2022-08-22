#! /usr/bin/env node

import path from 'path';
import esbuild from 'esbuild';
import { spawn } from 'child_process';
import { cwd, versions, env } from 'process';
import { rmSync } from 'fs';

import cli from './cli.js';
import { getConfig, getTempDir } from './utils.js';

const args = cli();

const dir = path.normalize(cwd());
const tmpdir = getTempDir();

let child;
let stop;

let config = getConfig(dir, args['config']);

let buildOptions = {
  entryPoints: [args['f']],
  platform: 'node',
  target: `node${versions.node}`,
  bundle: true,
  format: 'esm',
  sourcemap: true,
  sourcesContent: false,
  treeShaking: true,
  outfile: path.join(tmpdir, 'index.mjs'),
  ...config
};

const clean = async () => {
  if (stop) {
    stop();
  }

  return rmSync(tmpdir, {
    recursive: true,
    maxRetries: 3,
    force: true
  });
};

process.on('exit', clean);

//catches ctrl+c event
process.on('SIGINT', process.exit);
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', process.exit);
process.on('SIGUSR2', process.exit);
//catches uncaught exceptions
process.on('uncaughtException', process.exit);

/**
 * Run
 */
const run = async () => {
  if (child) {
    child.kill('SIGTERM');
  }

  if (child && !child.killed) {
    child.kill('SIGKILL');
  }

  child = spawn('node', ['--enable-source-maps', buildOptions.outfile], {
    stdio: 'inherit',
    cwd: cwd(),
    env
  });

  child.on('error', (error) => console.log(`error: ${error.message}`));
};

if (args['watch']) {
  buildOptions.watch = {
    onRebuild: (err, res) => {
      if (!err) {
        run();
      }
    }
  };
}

/**
 * Start
 */
try {
  const built = await esbuild.build(buildOptions).then((result) => {
    stop = result.stop;
    run();
  });
} catch (error) {
  console.log(error);
  console.log("Couldn't run due to errors.");
}
