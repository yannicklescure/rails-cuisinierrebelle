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

const vue = require('./loaders/vue')
environment.loaders.prepend('vue', vue)
environment.config.resolve.alias = { 'vue$': 'vue/dist/vue.esm.js' }
const { VueLoaderPlugin } = require('vue-loader')
environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())

module.exports = environment
