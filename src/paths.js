const path = require('path');
const rcfile = require('rcfile');
const utils = require('./utils');
const defaultConfig = require('./config');
const rcConfig = rcfile('rgrc', { configFileName: '.rgrc' });
const config = Object.assign({}, defaultConfig, rcConfig);

const baseDir = process.cwd();
const templatesDir = utils.existsSync(path.join(baseDir, config.templates)) ?
  path.join(baseDir, config.templates) :
  path.join(__dirname, config.templates);

const reducerStub = path.join(templatesDir, config.reducerTemplate);
const actionStub = path.join(templatesDir, config.actionTemplate);
const selectorStub = path.join(templatesDir, config.selectorTemplate);
const containerStub = path.join(templatesDir, config.containerTemplate);
const componentStub = path.join(templatesDir, config.componentTemplate);
const stylesStub = path.join(templatesDir, config.stylesTemplate);
const indexStub = path.join(templatesDir, config.indexTemplate);
const sceneStub = path.join(templatesDir, config.sceneTemplate);

utils.assert(utils.existsSync(reducerStub), 'Reducer template stub not found.');
utils.assert(utils.existsSync(actionStub), 'Action template stub not found.');
utils.assert(utils.existsSync(selectorStub), 'Selector template stub not found.');
utils.assert(utils.existsSync(containerStub), 'Container template stub not found.');
utils.assert(utils.existsSync(componentStub), 'Component template stub not found.');
utils.assert(utils.existsSync(stylesStub), 'Stles template stub not found.');
utils.assert(utils.existsSync(indexStub), 'Index template stub not found.');

module.exports = {
  rootDir: config.root,
  baseDir,
  templatesDir,
  reducerStub,
  actionStub,
  selectorStub,
  containerStub,
  componentStub,
  stylesStub,
  indexStub,
  sceneStub,
};
