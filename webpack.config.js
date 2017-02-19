const path = require('path');
const webpack = require('webpack');

module.exports = {
  //entry point - first for app, other for HotModuleReplacementPlugin
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
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
          ],
  devtool: 'soource-map',

  //simple loaders. 1) babel for transplaling, img for ex. with url-loader and css for ex. work with styles
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
  			test: /\.css$/,
  			use: [
          {
              loader: "style-loader"
          },
          {
              loader: "css-loader",
              options: {
                modules: true
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
