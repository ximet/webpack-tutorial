const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
            './src/index.js',
            'webpack/hot/dev-server',
  			    'webpack-dev-server/client?http://localhost:8082'
          ],
  plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.UglifyJsPlugin({
              sourceMap: true,
              comments: true,
              compress: {
                warnings: true
              }
            }),
            new ExtractTextPlugin({ filename: 'main.css', disable: false, allChunks: true }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
          ],
  devtool: 'soource-map',

  module: {
		rules: [
      {
  			test: /\.js$/,
  			use: [
          {
            loader: 'babel-loader'
          }
        ]
		  },
      {
  			test: /\.(png|jpg|gif)$/,
  			use: [
          {
            loader: 'url-loader?limit=10000&name=images/[hash:12].[ext]'
          }
        ]
		  },
      {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?importLoaders=1', 'postcss-loader']
          })
      }
    ]
	},
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  }
}
