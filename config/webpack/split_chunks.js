module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
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
        },
        styles: {
          name: 'styles',
          test: /\.(sass|scss|css)$/,
          chunks: 'all',
          enforce: true,
        },
      }
    }
  }
}
