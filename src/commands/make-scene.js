const program = require('commander');
const path = require('path');
const template = require('lodash.template');
const snakeCase = require('lodash.snakecase');
const uppercase = require('lodash.toupper');
const kebab = require('lodash.kebabcase');
const lowercase = require('lodash.tolower');
const upperfirst = require('lodash.upperfirst');
const utils = require('../utils');
const paths = require('../paths');

program
  .command('make:scene <name>')
  .action((name, options) => {
    const folderName = lowercase(kebab(name));
    utils.info('path ' + options.parent.path)
    const insertPath = path.join(
      paths.baseDir,
      options.parent.root,
      options.parent.path === './' ? 'scenes/' : options.parent.path
    );

    utils.assert(
      utils.existsSync(insertPath),
      '"make" insert path does not exist.'
    );

    utils.info(`Creating state "${name}"...`);

    utils.exists(`${insertPath}`)
      .catch(() => utils.exit(
        `State folder with name "${insertPath}" not exists.`
      ))
      .then(() => Promise.all([
        utils.read(paths.sceneStub, 'utf8'),
      ]))
      .then(res => {
        return Promise.all([
          Promise.resolve(template(res[0])({
            name: folderName,
            nameWithUpperfirst: upperfirst(name)
          }))
        ]);
      })
      .then(res => Promise.all([
        utils.write(`${insertPath}${name}Scene.js`, res[0]),
      ]))
      .then(() => utils.success(
        `State folder successfully created!
        ==> "${insertPath}${name}Scene.js"`
      ))
      .catch(utils.exit);
  });
