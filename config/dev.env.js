const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ENDPOINTS: '{i18N: "http://localhost:7082"}',
});
