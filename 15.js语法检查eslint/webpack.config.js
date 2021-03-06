
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /*
      语法检查 eslint-loader eslint
      设置检查规则
      eslintConfig
      airbnb => 

      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './src/index.html'
    })
  ],
  mode: 'production'
}