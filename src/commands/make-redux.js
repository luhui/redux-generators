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
  .command('make:redux <name>')
  .option('--selectors <list>', 'Add selector items', utils.list, ['testSelector'])
  .action((name, options) => {
    const folderName = lowercase(kebab(name));
    utils.info('path ' + options.parent.path)
    const insertPath = path.join(
      paths.baseDir,
      options.parent.root,
      options.parent.path === './' ? 'modules/' : options.parent.path
    );

    utils.assert(
      utils.existsSync(insertPath),
      '"make" insert path does not exist.'
    );

    utils.info(`Creating state "${name}"...`);

    utils.exists(`${insertPath}${folderName}`)
      .then(() => utils.exit(
        `State folder with name "${folderName}" already exists.`
      ))
      .catch(() => utils.mkdir(`${insertPath}${folderName}`))
      .then(() => Promise.all([
        utils.read(paths.reducerStub, 'utf8'),
        utils.read(paths.actionStub, 'utf8'),
        utils.read(paths.selectorStub, 'utf8'),
        utils.read(paths.indexStub, 'utf8'),
      ]))
      .then(res => {
        return Promise.all([
          Promise.resolve(template(res[0])({
            name: folderName,
          })),
          Promise.resolve(template(res[1])({
            prefix: uppercase(folderName),
          })),
          Promise.resolve(template(res[2])({
            selectors: options.selectors,
          })),
          Promise.resolve(template(res[3])({
            name: folderName,
          }))
        ]);
      })
      .then(res => Promise.all([
        utils.write(`${insertPath}${folderName}/${folderName}Reducer.js`, res[0]),
        utils.write(`${insertPath}${folderName}/${folderName}Actions.js`, res[1]),
        utils.write(`${insertPath}${folderName}/${folderName}Selectors.js`, res[2]),
        utils.write(`${insertPath}${folderName}/index.js`, res[3]),
      ]))
      .then(() => utils.success(
        `State folder successfully created!
        ==> "${insertPath}${folderName}/"
        ==> "${insertPath}${folderName}/${folderName}Reducer.js"
        ==> "${insertPath}${folderName}/${folderName}Actions.js"
        ==> "${insertPath}${folderName}/${folderName}Selectors.js"
        ==> "${insertPath}${folderName}/index.js"`
      ))
      .catch(utils.exit);
  });
