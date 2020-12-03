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


// module.exports = {
//   entry: 'index.js',
//   output: {
//     path: __dirname + '/dist',
//     filename: 'index_bundle.js'
//   },
//   plugins: [
//     new HtmlWebpackPlugin()
//   ]
// }

// environment.config.set('entry', 'index.js')
// environment.config.set('output', {
//   path: __dirname + '/dist',
//   filename: 'index_bundle.js'
// })

// const { resolve } = require('path');
// const HTML = require('html-webpack-plugin');
// const WebpackCritical = require('webpack-critical');

// const dist = resolve('build');

// environment.config.set('output.path', dist)
// // environment.plugins.prepend(
// //   'WebpackCritical',
// //   new WebpackCritical({
// //     // context: dist,
// //     // ignore: [/bootstrap/, '@font-face']
// //   })
// // )

// const HtmlWebpackPlugin = require('html-webpack-plugin')
// environment.plugins.prepend(
//   'HtmlWebpackPlugin',
//   new HtmlWebpackPlugin()
// )

// module.exports = {
//   output: {
//     path: dist
//   },
//   // ...
//   plugins: [
//     new HTML({ ... })
//     new WebpackCritical({
//       context: dist,
//       ignore: [/bootstrap/, '@font-face']
//     })
//   ]
// }

// const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
// environment.plugins.delete("UglifyJs")
// environment.plugins.append("UglifyJs", new UglifyJsPlugin())
// environment.config.set('optimization.minimize', true);
// environment.config.set('optimization.minimizer', [new UglifyJsPlugin()]);

// environment.loaders.prepend('sass', {
//   test: /\.s[ac]ss$/i,
//   use: [
//     // Creates `style` nodes from JS strings
//     'style-loader',
//     // Translates CSS into CommonJS
//     'css-loader',
//     {
//       loader: 'postcss-loader', // Run post css actions
//       options: {
//         plugins: () => { // post css plugins, can be exported to postcss.config.js
//           return [
//             require('precss'),
//             require('autoprefixer')
//           ];
//         }
//       }
//     },
//     // Compiles Sass to CSS
//     {
//       loader: 'sass-loader',
//       options: {
//         // Prefer `dart-sass`
//         implementation: require('sass'),
//       },
//     }
//   ],
// },)

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

// config/webpack/environment.js

const WebpackAssetsManifest = require('webpack-assets-manifest')

// Should override the existing manifest plugin
environment.plugins.insert(
  'Manifest',
  new WebpackAssetsManifest({
    entrypoints: true, // default in rails is false
    writeToDisk: true, // rails defaults copied from webpacker
    publicPath: true // rails defaults copied from webpacker
  })
)

const vue = require('./loaders/vue')
environment.loaders.prepend('vue', vue)
environment.config.resolve.alias = { 'vue$': 'vue/dist/vue.esm.js' }
const { VueLoaderPlugin } = require('vue-loader')
environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())

// const sass = require('./loaders/sass')
// environment.loaders.prepend('sass', sass)

const splitChunks = require('./split_chunks')
environment.config.merge(splitChunks)

environment.config.merge()
module.exports = environment
