import { program } from 'commander';

program.option('-w, --watch', 'Recompile files on changes');
program.option('-s, --onSuccess [command]', 'Run commands after every successful compile');
program.option('-t, --target [node|browser]', 'Your target environment', 'node');
program.option('-p, --production', 'Bundle in production mode?');
program.option('--ignore [list]', 'A comma seperated list of dependencies to not bundle');
// program.option('-c, --copy', 'Copy static files');

program.parse();

export const options = program.opts();
