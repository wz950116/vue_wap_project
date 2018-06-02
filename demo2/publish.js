const root = process.argv[2];
const publishRoot = process.argv[3];
const buildCmd = "npm run build";

const child_process = require("child_process");
require("shelljs/global");

const log = child_process.execSync(`cd ${root} && ${buildCmd}`);
// 一个指向标准输出流(stdout)的 可写的流(Writable Stream)：
process.stdout.write(log);

rm("-rf", `${publishRoot}/res/activity-cards`);
cp("-rf", `${root}/dist`, `${publishRoot}/res/activity-cards`);

const envArray = [{
    env: "dev",
    res: "//focus-res-dev.cn/activity/activity-cards"
}, {
    env: "test",
    res: "//focus-res-test.cn/activity/activity-cards"
}, {
    env: "work",
    res: "//t1.focus-res.cn/activity/activity-cards"
}];

for (let i = 0; i < envArray.length; i++) {

    mkdir("-p", `${publishRoot}/ds-conf/${envArray[i].env}/activity-cards`);
    cp("-rf", `${root}/dist/index.html`, `${publishRoot}/ds-conf/${envArray[i].env}/activity-cards/index.html`);

    if (envArray[i].env == "work") {
        sed("-i", `window.env = '-dev'`, `window.env = '';`, `${publishRoot}/ds-conf/${envArray[i].env}/activity-cards/index.html`);
    } else {
        sed("-i", `window.env = '-dev'`, `window.env = '-${envArray[i].env}';`, `${publishRoot}/ds-conf/${envArray[i].env}/activity-cards/index.html`);
    }

    sed("-i", /RES-PATH/g, envArray[i].res, `${publishRoot}/ds-conf/${envArray[i].env}/activity-cards/index.html`);
    
    sed("-i", `window.domainRes = './'`, `window.domainRes = '${envArray[i].res}';`, `${publishRoot}/ds-conf/${envArray[i].env}/activity-cards/index.html`);
}

sed("-i", /"RES-PATH"/g, "window.domainRes + '/'", `${publishRoot}/res/activity-cards/static/js/*.js`);

console.log("copy success.");
