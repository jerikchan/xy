#!/usr/bin/env node

const yParser = require('yargs-parser');
const fs = require('fs');
const Service = require('../lib/Service').default;
const path = require('path');
const userHome = require('user-home');

const args = yParser(process.argv.slice(2));

// Plugin List
const Block = require('@xiyun/xy-plugin-block').default;
const Create = require('@xiyun/xy-plugin-create').default;
const Generator = require('@xiyun/xy-plugin-generator').default;
const Add = require('@xiyun/xy-plugin-add').default;

// 禧云生态通用插件
const pluginList = [Block, Create, Add, Generator];

// 处理外部装载的插件
module.paths.unshift(path.resolve(userHome, '.xy', 'plugins', 'node_modules'));

// 根据宿主目录，./xy/plugins/packages.json 注入到 Service 中
const xyPluginPkg = path.resolve(userHome, '.xy', 'plugins', 'package.json');
if (fs.existsSync(xyPluginPkg)) {
  const dependencies = require(xyPluginPkg).dependencies;
  Object.keys(dependencies).forEach(item => {
    pluginList.push(require(item).default);
  });
}

const service = new Service(args._[0], args, {
  plugins: pluginList,
});

service.run();
