const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sassLintPlugin = require('sasslint-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].css',
  disable: !isProd
});

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/js/index.js'),
    style: path.join(__dirname, 'src/scss/index.scss')
  },
  output: {
    path: path.join(__dirname, './public/'),
    filename: `js/[name]${isProd ? '.min' : ''}.js`,
    chunkFilename: `js/[name].chunk${isProd ? '.min' : ''}.js`,
    sourceMapFilename: '[file].map'
  },
  plugins: [
    new CleanWebpackPlugin(path.join(__dirname, 'public')),
    new sassLintPlugin({
      configFile: path.join(__dirname, './.sass-lint.yml'),
      glob: 'src/**/*.s?(a|c)ss',
      failOnWarning: false,
      failOnError: false
    }),
    new WebpackNotifierPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './src/index.html'),
    }), !isProd ?
    new webpack.HotModuleReplacementPlugin({
      multistep: true
    }) :
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    }),
    extractSass,
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    compress: true,
    port: PORT,
    inline: true,
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
      ignored: /node_modules/
    }
  },
  devtool: !isProd ? 'source-map' : 'nosources-source-map',
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
              loader: 'css-loader',
              options: {
                sourceMap: !isProd
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProd,
                plugins: (loader) => [
                  require('autoprefixer')(['last 10 version', 'ie >= 10', 'Firefox 15']),
                ]
              }
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: !isProd
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProd
              }
            },
            {
              loader: 'import-glob-loader',
              options: {
                sourceMap: !isProd
              }
            }
          ],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              'es2015', 'es2016', 'es2017',
              'stage-0', 'stage-1', 'stage-2',
              'stage-3'
            ],
            plugins: ['transform-runtime']
          }
        }, {
          loader: 'eslint-loader'
        }]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'images/'
          }
        }]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
        }]
      }
    ]
  }
};
