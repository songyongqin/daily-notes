const { resolve } = require('path');
const Webpack = require('webpack')

module.exports = {
  entry: {
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]'
  },
  plugins: [
    new Webpack.DllPlugin({
      name: '[name]_[hash]',
      path: resolve(__dirname,'dll/manifest.json')
    })
  ],
  mode: 'production'
}
