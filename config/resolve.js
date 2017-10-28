const path = require('path')

module.exports = {
  extensions: ['.js', '.jsx'],
  alias: {
    scss: path.join(__dirname, '..', 'src/scss')
  }
}
