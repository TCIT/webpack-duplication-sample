const path = require('path');
const webpack = require('webpack');
const config  = require('./webpack.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cleanWebpackPlugin = new CleanWebpackPlugin(['bundles'], {
  root: path.join(__dirname),
  verbose: true,
  dry: false
});

// TCT: Disabling source-maps meanwhile
// config.devtool = 'source-map';
config.plugins.push(new webpack.optimize.UglifyJsPlugin({mangle: false, sourceMap: false}));
  // TCT: Running react on production mode
config.plugins.push(new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}));
config.plugins.push(cleanWebpackPlugin);
config.output.publicPath = '/bundles/';
module.exports = config;