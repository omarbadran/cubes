import fs from 'fs';
import scanDirSync from 'scan-dir-recursive/sync';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { cwd, env } from 'process';

const run = async () => {
  const name = process.argv.slice(2)[0].split('/');
  // const samples = scanDirSync(path.join(dir, './sample'));

  if (name.length !== 2 || !['modules', 'apps'].includes(name[0]) || name[1].length < 1) {
    throw new Error(
      "You must provide the workspace and the package name, for example yarn newpkg -a='modules/hello'"
    );
  }

  const newPackage = `packages/${name[0]}/${name[1]}`;

  // if (!fs.existsSync(newPackage)) {
  //   fs.mkdirSync(newPackage);
  // } else {
  //   throw new Error('Package already exist');
  // }
};

try {
  await run();
} catch (error) {
  console.error(error);
}
