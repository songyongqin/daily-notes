
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: 'usage',
                corejs:{
                  version : 3
                }
              }
            ]
            
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './src/index.html'
    })
  ],
  mode: 'development'
}