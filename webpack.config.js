const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HappyPack = require('happypack');
const os = require('os');
const happypackThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

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
          			threadPool: happypackThreadPool,
          			loaders: ['babel-loader'],
          			cache: true,
          			verbose: false,
        		}),
        		new HappyPack({
          			id: 'url',
          			threadPool: happypackThreadPool,
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
      }
    ]
	},
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  }
}
