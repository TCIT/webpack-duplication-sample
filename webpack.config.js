const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin({path: path.join(__dirname, 'app', 'views')});
const webpack = require('webpack');

module.exports = {
  // resolveLoader: {root: path.join(__dirname, 'node_modules')},
  entry: ['./react/app'],
  output: {
    path: path.join(__dirname, 'public/bundles/'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/'
  },
  plugins: [
    assetsPluginInstance,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commonChunk',
      minChunks: 2,
      chunks: ['causeShow', 'causeIndex', 'briefShow', 'briefResolutionShow', 'officialResolutionShow', 'proceedingShow', 'certificationShow', 'veredictShow', 'entitiesShow']
    })
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules\/(?!(redux-auth)\/).*/,
      loader: 'babel-loader' // 'babel-loader' is also a legal name to reference
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.css$/,
      exclude: /\.useable\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
      loader: 'url-loader?limit=10000'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff'
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader?name=fonts/[name].[hash].[ext]&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader?name=fonts/[name].[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
