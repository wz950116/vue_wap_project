var root = process.argv[2]; // 前端代码仓库路径
var publishRoot = process.argv[3]; // system代码仓库路径
var buildCmd = 'npm run build';

var path = require('path');
var fs = require('fs'); // node.js 文件系统fs
var child_process = require('child_process'); // 子进程模块提供了衍生子进程的功能
require('shelljs/global'); // shelljs

// 获取webpack.config.js 备份
var configOrigin = fs.readFileSync(`${root}/public/webpack.config.js`, 'utf8');
// 替换webpack.config.js中的字符串
sed('-i', '"debug": true,', '"debug": false,', `${root}/public/webpack.config.js`);
sed('-i', "publicPath = ''", 'publicPath = "PUBLIC-PATH"', `${root}/public/webpack.config.js`);
// 子进程运行 npm run build
var log = child_process.execSync(`cd ${root} && ${buildCmd}`);

process.stdout.write(log); // 输出

// 将configOrigin写入webpack.config.js
fs.writeFileSync(`${root}/public/webpack.config.js`, configOrigin, 'utf8');

// 返回一个指定目录下所有文件名称的数组对象
var list = fs.readdirSync(`${root}/dist/`);
var entryFile;
for (let fileName of list) {
    if (/^app\..*js$/.test(fileName)) {
        entryFile = fileName;
        break;
    }
}
console.log(`Main entry file: ${entryFile}`);

var entry = fs.readFileSync(`${root}/dist/${entryFile}`, 'utf8');
entry = entry.replace('"PUBLIC-PATH"', 'window.domainRes');
fs.writeFileSync(`${root}/dist/${entryFile}`, entry, 'utf8');

console.log('build success.');

rm('-rf', `${publishRoot}/res/productivity-draw`);
cp('-rf', `${root}/dist`, `${publishRoot}/res/productivity-draw`);

var buildList = [{
    env:'dev',
    resPath:'//focus-res-dev.cn/productivity/productivity-draw'
}, {
    env:'test',
    resPath:'//focus-res-test.cn/productivity/productivity-draw'
}, {
    env:'work',
    resPath:'//t-res.51f.com/productivity/productivity-draw'
}];

for (var i = 0; i < buildList.length; i++) {
    // 新建
    mkdir('-p', `${publishRoot}/ds-conf/${buildList[i].env}/code/productivity-draw`);
    // 拷贝html
    cp('-rf', `${root}/dist/index.html`, `${publishRoot}/ds-conf/${buildList[i].env}/code/productivity-draw/index.html`);
    // 修改变量（rscode路径）
    if (buildList[i].env === 'work') {
        sed("-i", `window.env = '-dev'`, `window.env = '';`, `${publishRoot}/ds-conf/${buildList[i].env}/code/productivity-draw/index.html`);
    } else {
        sed("-i", `window.env = '-dev'`, `window.env = '-${buildList[i].env}';`, `${publishRoot}/ds-conf/${buildList[i].env}/code/productivity-draw/index.html`);
    };
    sed('-i', /window\.domainRes.*;/, `window.domainRes = \'${buildList[i].resPath}\';`, `${publishRoot}/ds-conf/${buildList[i].env}/code/productivity-draw/index.html`);   
    sed('-i', /PUBLIC-PATH/g, `${buildList[i].resPath}`, `${publishRoot}/ds-conf/${buildList[i].env}/code/productivity-draw/index.html`);
}

console.log('copy success.');
