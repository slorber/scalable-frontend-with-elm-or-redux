var webpack = require('webpack')

module.exports = {
  entry: './src/index',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: [/node_modules/]
      }
    ]
  }
}
