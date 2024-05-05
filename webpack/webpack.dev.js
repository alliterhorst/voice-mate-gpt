const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackExtReloader = require('webpack-ext-reloader');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  watch: true,
  plugins: [
    new WebpackExtReloader({
      port: 9129,
      reloadPage: true,
      entries: {
        contentScript: 'content_script',
        background: 'background',
        extensionPage: ['popup', 'options'],
      },
    }),
  ],
});
