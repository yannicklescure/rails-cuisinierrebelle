process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

environment.config.delete('optimization.minimizer')

const TerserPlugin = require("terser-webpack-plugin");
// environment.config.set('optimization.minimize', true);
// environment.config.set('optimization.minimizer', [new TerserPlugin()]);
environment.config.merge({
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
           parse: {
             // Let terser parse ecma 8 code but always output
             // ES5 compliant code for older browsers
             ecma: 8
           },
           compress: {
             ecma: 5,
             warnings: false,
             comparisons: false
           },
           mangle: {
             safari10: true
           },
           output: {
             ecma: 5,
             comments: false,
             ascii_only: true
           }
         }
      })
    ]
  }
})

environment.splitChunks()

module.exports = environment.toWebpackConfig()
