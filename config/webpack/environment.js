// config/webpack/environment.js

// import(/* webpackPreload: true */ "material-icons/iconfont/MaterialIcons-Regular.woff2")
// import(/* webpackPreload: true */ "@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2")

const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

// Preventing Babel from transpiling NodeModules packages
environment.loaders.delete('nodeModules');

// Bootstrap 4 has a dependency over jQuery & Popper.js:
environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default']
  })
)

environment.config.merge()

const FontminPlugin = require('fontmin-webpack')

environment.plugins.append(
  'Fontmin', new FontminPlugin({
    autodetect: true,
  })
)

const bootstrap = {
  test: /\.(scss)$/,
  use: [{
    loader: 'style-loader', // inject CSS to page
  }, {
    loader: 'css-loader', // translates CSS into CommonJS modules
  }, {
    loader: 'postcss-loader', // Run post css actions
    options: {
      plugins: function () { // post css plugins, can be exported to postcss.config.js
        return [
          require('precss'),
          require('autoprefixer')
        ];
      }
    }
  }, {
    loader: 'sass-loader' // compiles Sass to CSS
  }]
}
environment.loaders.append('bootstrap', bootstrap)

environment.splitChunks((config) => Object.assign({}, config, {
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      // minRemainingSize: 0,
      maxSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}))
// environment.splitChunks()

// // Get the actual sass-loader config
// const sassLoader = environment.loaders.get('sass')
// const sassLoaderConfig = sassLoader.use.find(function(element) {
//   return element.loader == 'sass-loader'
// })

// // Use Dart-implementation of Sass (default is node-sass)
// const options = sassLoaderConfig.options
// options.implementation = require('sass')

module.exports = environment
