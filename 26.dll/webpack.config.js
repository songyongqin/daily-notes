const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname,'build')
  },
  plugins: [
    new Webpack.DllReferencePlugin({
      manifest: resolve(__dirname,'dll/manifest.json')
    }),
    new addAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname,'dll/jquery.js')
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  mode: 'production'
}