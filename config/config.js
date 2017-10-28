const path = require('path')

module.exports = {
  isProd: process.env.NODE_ENV === 'production',
  port: 3000,
  contentBase: path.join(__dirname, '..', 'public')
}
