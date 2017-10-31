module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {loader: 'babel-loader'},
      {loader: 'eslint-loader'}
    ]
  },
  {
    test: /\.(png|jpg|gif|svg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: 'assets/'
        }
      }
    ]
  },
  {
    test: /\.html$/,
    use: [{loader: 'html-loader'}]
  }
]
