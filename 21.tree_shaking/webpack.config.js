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


const commonCssLoader = [
  {
    loader:MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  },
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins:() => {
        require('postcss-preset-env')()
      }
    }
  }
]

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: "js/built.[contenthash:10].js",
    path: resolve(__dirname,'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              ...commonCssLoader
            ]
          },
          {
            test: /\.less$/,
            use: [
              ...commonCssLoader, 'less-loader'
            ]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs:{
                      version: 3
                    }
                  }
                ]
              ],
              cacheDirectory: true
            }
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8*1024,
              esModule: false,
              outputPath: 'imgs',
              name: '[hash:10].[ext]'
            }
          },
          {
            exclude: /\.(css|less|js|html|jpg|png|gif)/,
            loader: 'file-loader',
            options: {
              outputPath: 'media'
            }
          }
        ]
      },
    ]
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
  mode: 'production'
}