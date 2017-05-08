const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HappyPack = require('happypack');

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
            }),
            new HappyPack({
          			id: 'js',
          			threads: 2,
          			loaders: ['babel-loader'],
          			cache: true,
          			verbose: false,
        		}),
        		new HappyPack({
          			id: 'url',
          			threads: 2,
          			loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
          			cache: true,
          			verbose: false,
        		})
          ],
  devtool: 'soource-map',

  module: {
		rules: [
      {
    			test: /\.js$/,
    			use: ['happypack/loader?id=js'],
		  },
      {
    			test: /\.(png|jpg|gif)$/,
    			use: ['happypack/loader?id=url'],
		  },
      {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?importLoaders=1', 'postcss-loader']
          })
      },
      {
    			test: /\.html$/,
    			use: ['html-loader'],
		  },
      {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'react-svg-loader',
              query: {
                svgo: {
                  plugins: [{removeTitle: false}],
                  floatPrecision: 2
                }
              }
            }
          ]
      }
    ]
	},
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  }
}
