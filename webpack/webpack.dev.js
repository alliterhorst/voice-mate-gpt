const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const srcDir = path.join(__dirname, '..', 'src');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: path.join(srcDir, 'app.tsx'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'index.html'),
      filename: 'index.html',
      chunks: ['app'],
    }),
  ],
  devServer: {
    static: path.join(__dirname, '../dist'),
    compress: true,
    port: 9000,
  },
});
