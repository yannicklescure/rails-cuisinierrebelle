// config/webpack/environment.js

// import(/* webpackPreload: true */ "material-icons/iconfont/MaterialIcons-Regular.woff2")
// import(/* webpackPreload: true */ "@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2")

const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

const dotenv = require('dotenv')

const dotenvFiles = [
  `.env.${process.env.NODE_ENV}.local`,
  '.env.local',
  `.env.${process.env.NODE_ENV}`,
  '.env',
]
dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({ path: dotenvFile, silent: true })
})

// Preventing Babel from transpiling NodeModules packages
environment.loaders.delete('nodeModules')

// Bootstrap 4 has a dependency over jQuery & Popper.js:
environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default']
  })
)

environment.config.merge()

// const Critters = require('critters-webpack-plugin');

// environment.plugins.append('critters',
//   new Critters({
//     // Outputs: <link rel="preload" onload="this.rel='stylesheet'">
//     preload: 'swap',

//     // Don't inline critical font-face rules, but preload the font URLs:
//     preloadFonts: true
//   })
// );

const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
// environment.plugins.delete("UglifyJs")
// environment.plugins.append("UglifyJs", new UglifyJsPlugin())
environment.config.set('optimization.minimizer', [new UglifyJsPlugin(
    uglifyOptions: {
      compress: {
        arrows: false,
        booleans: false,
        cascade: false,
        collapse_vars: false,
        comparisons: false,
        computed_props: false,
        hoist_funs: false,
        hoist_props: false,
        hoist_vars: false,
        if_return: false,
        inline: false,
        join_vars: false,
        keep_infinity: true,
        loops: false,
        negate_iife: false,
        properties: false,
        reduce_funcs: false,
        reduce_vars: false,
        sequences: false,
        side_effects: false,
        switches: false,
        top_retain: false,
        toplevel: false,
        typeofs: false,
        unused: false,

        // Switch off all types of compression except those needed to convince
        // react-devtools that we're using a production build
        conditionals: true,
        dead_code: true,
        evaluate: true,
      },
      mangle: true,
    },
)])

const CompressionPlugin = require('compression-webpack-plugin');

environment.plugins.append('compression',
  new CompressionPlugin({
    // asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.(js|css)$/,
    threshold: 10240,
    minRatio: 0.8
  })
);

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

// config/webpack/environment.js
const splitChunks = require('./split_chunks')
const WebpackAssetsManifest = require('webpack-assets-manifest')

environment.config.merge(splitChunks)

// Should override the existing manifest plugin
environment.plugins.insert(
  'Manifest',
  new WebpackAssetsManifest({
    entrypoints: true, // default in rails is false
    writeToDisk: true, // rails defaults copied from webpacker
    publicPath: true // rails defaults copied from webpacker
  })
)

// environment.splitChunks((config) => Object.assign({}, config, {
//   optimization: {
//     splitChunks: {
//       chunks: 'all',
//       // minSize: 20000,
//       // // minRemainingSize: 0,
//       // maxSize: 30000,
//       // minChunks: 1,
//       // maxAsyncRequests: 30,
//       // maxInitialRequests: 30,
//       // automaticNameDelimiter: '~',
//       // enforceSizeThreshold: 50000,
//       // cacheGroups: {
//       //   defaultVendors: {
//       //     test: /[\\/]node_modules[\\/]/,
//       //     priority: -10
//       //   },
//       //   default: {
//       //     minChunks: 2,
//       //     priority: -20,
//       //     reuseExistingChunk: true
//       //   }
//       // }
//     }
//   }
// }))
// environment.splitChunks()

// Get the actual sass-loader config
const sassLoader = environment.loaders.get('sass')
const sassLoaderConfig = sassLoader.use.find(function(element) {
  return element.loader == 'sass-loader'
})

// Use Dart-implementation of Sass (default is node-sass)
const options = sassLoaderConfig.options
options.implementation = require('sass')

module.exports = environment
