const commander = require('commander');
const init = require('./commands/init.js');

commander.version('1.0.0').option('-t --test', 'Do the thing');

commander
  .command('init')
  .description('Initialize a new MarkLogic module package')
  .action(() => {
    console.log('creating a new module package');
    init();
  });

commander
  .command('install [module]')
  .description(
    'Install the named MarkLogic module package, or all packages listed in the mlpm config file'
  )
  .action(module => {
    if (module) {
      // TODO accept version tag
      console.log('installing %s ...', module);
    } else {
      console.log('installing modules ...');
    }
  });

commander
  .command('uninstall [module]')
  .description(
    'Uninstall the named MarkLogic module package, or all packages listed in the mlpm config file'
  )
  .action(module => {
    // TODO accept version tag
    if (module) {
      console.log('uninstalling %s ...', module);
    } else {
      console.log('uninstalling modules ...');
    }
  });

commander
  .command('list')
  .description('List the installed MarkLogic module packages')
  .action(module => {
    console.log('listing installed packages');
  });

commander.parse(process.argv);

if (commander.test) {
  console.log('sdafsdafsdafdsfds');
}
