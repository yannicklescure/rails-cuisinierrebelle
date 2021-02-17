process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

const TerserPlugin = require("terser-webpack-plugin");
environment.config.set('optimization.minimize', true);
environment.config.set('optimization.minimizer', [new TerserPlugin()]);

environment.splitChunks()

module.exports = environment.toWebpackConfig()
