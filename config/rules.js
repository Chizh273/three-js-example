module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015', 'es2016', 'es2017',
            'stage-0', 'stage-1', 'stage-2',
            'stage-3'
          ],
          plugins: ['transform-runtime']
        }
      },
      {
        loader: 'eslint-loader'
      }
    ]
  },
  {
    test: /\.(png|jpg|gif|svg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: 'images/'
        }
      }
    ]
  },
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader'
      }
    ]
  }
]
