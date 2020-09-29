const {resolve} = require('path')
//对css提炼，分离js与css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//压缩css
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
//html处理
const HtmlWebpackPlugin = require('html-webpack-plugin')


/**
 * tree shaking :去除无用代码
 * 前提：使用es6模块化 开启production
 * 
 *  
*/

module.exports = {
  entry: './src/js/index.js',
  // entry: {
  //   main:'./src/js/index.js',
  //   test:'./src/js/test.js',
  // },
  output: {
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname,'build')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  optimization:{
    splitChunks:{
      chunks: 'all'
    }
  },
  mode: 'production'
}