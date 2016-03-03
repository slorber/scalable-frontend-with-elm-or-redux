var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.development');

var app = express();
var compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  stats: {
    colors: true,
  },
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(process.env.PORT || 3000, function(err) {
  if (err) {
    console.log(err);
  }
});
