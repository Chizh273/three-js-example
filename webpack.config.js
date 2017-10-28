/* eslint-disable */
const path = require('path')

const config = require('./config/config')

const devServer = require('./config/dev-server')
const resolve = require('./config/resolve')
const plugins = require('./config/plugins')
const rules = require('./config/rules')
const scss = require('./config/scss-loader')

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/js/index.js')
  },
  output: {
    path: config.contentBase,
    filename: `js/[name]${config.isProd ? '.min' : ''}.js`,
    chunkFilename: `js/[name].chunk${config.isProd ? '.min' : ''}.js`,
    sourceMapFilename: '[file].map'
  },
  plugins: [
    ...plugins,
    ...scss.plugins
  ],
  devServer,
  devtool: !config.isProd ? 'source-map' : 'nosources-source-map',
  resolve,
  module: {
    rules: [
      ...rules,
      ...scss.module.rules
    ]
  }
}
