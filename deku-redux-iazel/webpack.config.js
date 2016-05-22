var webpack = require('webpack');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: { 
    path: __dirname + '/demo/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ],
  }
};
