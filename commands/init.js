const fs = require('fs');

module.exports = function (opts) {
  var config;

  try {
    config = fs.readFileSync('marklogic-modules.json');
    if (config) {
      console.log('A marklogic-modules.json configuration file already exists');
      return false;
    }
  } catch (err) {
    // no file exists.  proceed
  }

  config = {
    name: 'test',
    version: '1.0.0',
    description: 'test',
    author: 'john doe'
  };

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
      console.log('created marklogic-modules.json');
    }
  );
};
