const {resolve} = require('path')
//对css提炼，分离js与css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//压缩css
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
//html处理
const HtmlWebpackPlugin = require('html-webpack-plugin')


/**
 *缓存
 *  babel-loader 增加cacheDirectory
 * 让第二次打包构建更快
 * 文件资源缓存
 * hash: 每次webpack会生成唯一的hash值
 * 因为js和css同时使用一个hash值，如果修改一个文件，重新打包会新生成一个hash值导致所有缓存失效
 * chunkhash:根据chunk生成hash值，如果打包来源于同一个chunk则hash值相同，
 * 问题 js和css的hash还是相同的
 * 因为css时在js中引入，所以同属于一个chunk
 * contenthash: 根据文件内容生成hash值，不同文件hash值一定不一样
 * 让代码上线运行缓存更好拥
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
  mode: 'development'
}