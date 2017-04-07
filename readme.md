# Redux Generators

[![npm](https://img.shields.io/npm/v/redux-generators.svg)](https://www.npmjs.com/package/redux-generators)
[![license](https://img.shields.io/github/license/bpxl-labs/redux-generators.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](.github/CONTRIBUTING.md)
[![Maintenance](https://img.shields.io/maintenance/yes/2016.svg)]()

感谢[Redux Generators](https://github.com/bpxl-labs/redux-generators)，我们基于此，结合自己的业务需求，提供了生成相应模块模板的工具

### Prerequisites
Redux Generators requires the following utilities:
- [reselect](https://github.com/reactjs/reselect) selector library for Redux
- [redux-actions](https://github.com/acdlite/redux-actions) Flux Standard Action utilities for Redux
- [react-redux](https://github.com/reactjs/react-redux) Official React bindings for Redux

If you aren't using them already, install and add to your project's dependencies with:

`$ npm i reselect redux-actions react-redux --save`

### Sample usage

1. `$ npm i redux-generators -g`
2. `$ rg make:component login

### Available Commands

|Command|Description|
|---|---|
|`rg make:component [options]`|Creates a component.|
|`rg make:redux [options]`|Creates actions&selectors&reducers.|
|`rg make:scene [options]`|Creates scenes.|

### Global Options

|Option|Description|
|---|---|
|`-r, --root [path]`|The root path for the CLI, defaults to current working directory|
|`-p, --path [path]`|The path based on root to insert the files, defaults to `./`|

You can also add a `.rgrc` file to your project root to set config values used in `redux-generators`. Here is an example `.rgrc` file with all available options:

```json
{
  "root": "./",
  "templates": "./templates",
  "reducerTemplate": "reducer.stub",
  "actionTemplate": "actions.stub",
  "selectorTemplate": "selectors.stub",
  "containerTemplate": "container.stub",
}
```

- `root` is the same as the global option
- `templates` is the path to your own custom templates directory
- `reducerTemplate` is the filename of your reducer template
- `actionTemplate` is the filename of your action template
- `selectorTemplate` is the filename of your selector template
- `containerTemplate` is the filename of your container template

### Custom templates

By default `redux-generators` will generate files for you with some great conventions and standards in mind. However, if you would like to have a set of your own templates, you can do so by creating a folder in your root directory to house your custom templates. This folder path will need to be set inside of a `.rgrc` file and all four template files will need to be present. All template files are rendered using [lodash's `template`](https://lodash.com/docs#template) method.

`reducerTemplate` gets passed the following data:

|Key|Type|Description|
|---|---|---|
|reducers|Array|A list of reducers that get combined together via `combineReducers`.|
|actionTypes|Array|A list of action types to pass to the reducers `handleActions` method.|

`actionTemplate` gets passed the following data:

|Key|Type|Description|
|---|---|---|
|actions|Array|A list of action creators that are created via `createAction`.|
|types|Array|A list of action types (based on actions) to pass to action creators.|

`selectorTemplate` gets passed the following data:

|Key|Type|Description|
|---|---|---|
|selectors|Array|A list of selectors that are created via `createSelector`.|

`containerTemplate` gets passed the following data:

|Key|Type|Description|
|---|---|---|
|name|String|The exported name of the container component.|
|selector|String|A selector to be passed as the first argument to the `connect` method.|

### `$ rg make <name> [options]`

Creates a new folder using `<name>` that houses three files:
- `reducer.js`
- `actions.js`
- `selectors.js`
