const pkg = require('./package');
const execSync = require('child_process').execSync;
// get the version as the short hash
const version = execSync('git rev-parse --short HEAD').toString().trim();
const now = (new Date()).toJSON();

// export values to be used by the templating build step
module.exports = {
    title: 'Snake Game',
    build: `${version} | ${now}`,
};
