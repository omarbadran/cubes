import yargs from 'yargs';
import { argv } from 'process';

export default () => {
  let y = yargs(argv.slice(2));

  y.option('file', {
    alias: 'f',
    type: 'string',
    describe: 'The file you want to execute.',
    demandOption: true,
    requiresArg: true
  });

  y.option('watch', {
    alias: 'w',
    type: 'boolean',
    default: false,
    describe: 'Restart on file changes.'
  });

  y.option('config', {
    alias: 'c',
    type: 'string',
    default: 'esbuild.config.json',
    describe: 'A json file with list of parameters that will be passed to esbuild directly.',
    demandOption: false,
    requiresArg: true
  });

  y.option('passArgs', {
    alias: 'a',
    type: 'string',
    default: '',
    describe: 'Pass any arugments to the file being executed.',
    demandOption: false,
    requiresArg: true
  });

  y.help();

  return y.argv;
};
