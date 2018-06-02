let domain = window.location.host;
let env = '';
let isProxy = false;

if ((/^\d+\.\d+\.\d+\.\d+/).test(domain)) {
    isProxy = true;
    env = '-dev';
} else if ((/\-dev/).test(domain)) {
    env = '-dev';
} else if ((/\-test/).test(domain)) {
    env = '-test';
} else {
    env = '';
};

var domainRes = '';

module.exports = {
    env: env,
    domainRes: domainRes,
    mock: false
};
