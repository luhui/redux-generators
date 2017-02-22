const program = require('commander');
const path = require('path');
const template = require('lodash.template');
const snakeCase = require('lodash.snakecase');
const uppercase = require('lodash.toupper');
const kebab = require('lodash.kebabcase');
const lowercase = require('lodash.tolower');
const upperfirst = require('lodash.upperfirst')
const utils = require('../utils');
const paths = require('../paths');

program
  .command('make:component <name>')
  .action((name, options) => {
    const folderName = lowercase(kebab(name));
    const insertPath = path.join(
      paths.baseDir,
      options.parent.root,
      options.parent.path === './' ? 'components/' : options.parent.path
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
        utils.read(paths.componentStub, 'utf8'),
        utils.read(paths.containerStub, 'utf8'),
        utils.read(paths.stylesStub, 'utf8'),
      ]))
      .then(res => {
        utils.info('resolve templae')
        return Promise.all([
          Promise.resolve(template(res[0])()),
          Promise.resolve(template(res[1])({
            name: upperfirst(folderName),
            actions: folderName,
          })),
          Promise.resolve(template(res[2])()),
        ]);
      })
      .then(res => Promise.all([
        utils.write(`${insertPath}${folderName}/${upperfirst(folderName)}View.js`, res[0]),
        utils.write(`${insertPath}${folderName}/index.js`, res[1]),
        utils.write(`${insertPath}${folderName}/styles.js`, res[2]),
      ]))
      .then(() => utils.success(
        `State folder successfully created!
        ==> "${insertPath}${folderName}/"
        ==> "${insertPath}${folderName}/${upperfirst(folderName)}View.js"
        ==> "${insertPath}${folderName}/index.js"
        ==> "${insertPath}${folderName}/styles.js"`
      ))
      .catch(utils.exit);
  });
