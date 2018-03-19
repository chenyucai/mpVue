var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function getEntry (dir, entryFile) {
  const files = fs.readdirSync(dir)
  return files.reduce((res, k) => {
    const page = path.resolve(dir, k, entryFile)
    if (fs.existsSync(page)) {
      res[k] = page
    }
    return res
  }, {})
}

const appEntry = { app: resolve('./src/main.js') }
const pagesEntry = getEntry(resolve('./src/pages'), 'main.js')
const entry = Object.assign({}, appEntry, pagesEntry)

module.exports = {
  entry: {
    app: resolve('./src/main.js'),
    'pages/consult/hospital/list': resolve('./src/pages/consult/hospital-list/main.js'),
    'pages/consult/doctor/list': resolve('./src/pages/consult/doctor-list/main.js'),
    'pages/consult/doctor/detail': resolve('./src/pages/consult/doctor-detail/main.js'),
    'pages/logs/logs': resolve('./src/pages/logs/main.js'),
    'pages/user/center': resolve('./src/pages/user-center/user-center/main.js')
  },
  target: require('mpvue-webpack-target'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'mpvue',
      '@': resolve('src'),
      'images': resolve('src/images')
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'mpvue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        include: [resolve('src'), resolve('test')],
        use: [
          'babel-loader',
          {
            loader: 'mpvue-loader',
            options: {
              checkMPEntry: true
            }
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name]].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  }
}
