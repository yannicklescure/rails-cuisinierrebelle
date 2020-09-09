// config/webpack/environment.js
// import(/* webpackPreload: true */ "...")

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

const FontminPlugin = require('fontmin-webpack')

environment.plugins.append(
  'Fontmin', new FontminPlugin({
    autodetect: true,
  })
)

const fs = require('fs')

let iconFontVersion = 'dev'
try {
  iconFontVersion = fs.readFileSync('REVISION', 'utf-8').trim()
}
catch(_error) {
  // okay, probably in dev mode
}

environment.loaders.prepend('fa-font', {
  test: /fa-.*\.(woff2|woff|eot|svg|ttf)$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[path][name]-[hash]-' + iconFontVersion + '.[ext]',
      context: join(config.source_path),
    }
  }]
})

environment.loaders.get('file').exclude = /fa-.*\.(woff2|woff|eot|svg|ttf)$/

environment.splitChunks((config) => Object.assign({}, config, { optimization: { splitChunks: { chunks: 'all' } }}))
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
