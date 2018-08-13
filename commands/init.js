const fs = require('fs');
const readline = require('readline');

const askModuleName = rl => {
  return new Promise((resolve, reject) => {
    rl.question('MarkLogic Module Name? ', answer => {
      if (!answer || answer.length === 0) reject(new Error('invalid name'));
      resolve(answer);
    });
  });
};

const askVersion = rl => {
  return new Promise((resolve, reject) => {
    rl.question('Module Version (1.0.0)? ', answer => {
      if (!answer || answer.length === 0) resolve('1.0.0');
      resolve(answer);
    });
  });
};

function createInitialFiles (config) {
  // create the config file
  fs.writeFile(
    'marklogic-modules.json',
    JSON.stringify(config, null, 2),
    err => {
      if (err) throw err;
      console.log('created marklogic-modules.json');
    }
  );

  // create the initial module file
  fs.writeFile(
    'index.sjs',
    `// marklogic module
module.exports = {};
`,
    err => {
      if (err) throw err;
      console.log('created index.sjs');
    }
  );

  // create an empty readme file
  fs.writeFile(
    'README.md',
    '',
    err => {
      if (err) throw err;
      console.log('created README.md');
    }
  );
}

module.exports = async (opts) => {
  // check that a config file doesn't already exist
  try {
    var config = fs.readFileSync('marklogic-modules.json');
    if (config) {
      console.log('A marklogic-modules.json configuration file already exists');
      return false;
    }
  } catch (err) {
    // no file exists.  proceed
  }

  // prompt the user for input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    var configOptions = {
      name: await askModuleName(rl),
      version: await askVersion(rl),
      description: 'test',
      author: 'john doe'
    };
    createInitialFiles(configOptions);
  } catch (err) {
    console.error(err.message);
  }
};
