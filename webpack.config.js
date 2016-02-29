var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Load *package.json* so we can use `dependencies` from there for vendoring
var pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist')
};

process.env.BABEL_ENV = TARGET;

var common = {
  context: PATHS.app,
  entry: './index',
  resolve: {
    root: path.resolve('./app'),
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(png|jpg|gif|ico|xml|json)$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: './app/public/index.html'
    })
  ]
};


if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // display only errors to reduce the amount of output
      stats: 'errors-only',

      // parse host and port from env so this is easy
      // to customize
      host: process.env.HOST,
      port: process.env.PORT
    },
    output: {
      publicPath: '/'
    },
    module: {
      loaders: [
        {
          // During development we will use the react-transform-hmr
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react'],
            plugins: [
              ['react-transform', {
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module'],
                  }
                ],
              }],
            ],
          }
        },
        {
          // Define development specific CSS setup
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass'],
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === 'build' || TARGET === 'stats') {
  var vendorList = Object.keys(pkg.dependencies).filter(function(v) {
    // We are not using the bootstrap-sass jQuery plugins.
    // Additionally, we are not using jQuery which generates a
    // "Bootstrap's JavaScript requires jQuery" error in production.
    // If we do start using the bootstrap stuff, we should remove this
    // and just make sure that we are also using jQuery.

    var rejects = ['bootstrap-sass', 'font-awesome'];
    return rejects.indexOf(v) == -1
  })

  module.exports = merge(common, {
    // Define entry points needed for splitting
    entry: {
      app: './index',
      vendor: vendorList
    },
    output: {
      path: PATHS.dist,
      publicPath: '/',
      // Output using entry name
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          // During production, no react-transform-hmr
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react']
          }
        },
        {
          // Extract CSS during build
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style", "css!sass")
        }
      ]
    },
    plugins: [
      new Clean([PATHS.dist]),
      // Output extracted CSS to a file
      new ExtractTextPlugin('style.[chunkhash].css'),
      // Extract vendor and manifest files
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      // Setting DefinePlugin affects React library size!
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
};
