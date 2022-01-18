const config = require('./webpack.config.js');
const { merge } = require('webpack-merge');
module.exports = merge(config, {
  mode: 'production',
});