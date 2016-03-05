var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [__dirname + '/src/index'],
  output: {
    path: __dirname + '/_dist',
    filename: '[hash].js',
  },
  resolve: {
    root: [
      __dirname + '/src',
      __dirname + '/node_modules',
    ],
    extensions: ['', '.js'],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: /src/,
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
      include: /components/,
    }, {
      test: /\.(jpe?g|png|gif|svg|ico)/i,
      loader: 'file',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      inject: false,
    }),
  ],
};
