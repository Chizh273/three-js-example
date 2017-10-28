const config = require('./config')

module.exports = {
  contentBase: config.contentBase,
  watchContentBase: true,
  compress: true,
  port: config.port,
  inline: true,
  hot: true,
  historyApiFallback: true,
  host: '0.0.0.0',
  overlay: {
    warnings: true,
    errors: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
    ignored: /node_modules/
  }
}
