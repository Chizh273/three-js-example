const config = require('./config')

const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SassLintPlugin = require('sasslint-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const plugins = [
  new SassLintPlugin({
    configFile: path.join(__dirname, '..', '.sass-lint.yml'),
    glob: 'src/**/*.s?(a|c)ss',
    failOnWarning: false,
    failOnError: false
  }),
  new HtmlWebpackPlugin({
    inject: true,
    template: path.join(__dirname, '..', './src/index.html')
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrorsPlugin()
]

if (config.isProd) {
  plugins.push(
    new CleanWebpackPlugin(config.contentBase),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  )
} else {
  plugins.push(
    new WebpackNotifierPlugin(),
    new webpack.HotModuleReplacementPlugin({multistep: true})
  )
}

module.exports = plugins
