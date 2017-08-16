'use strict';
var webpack = require('webpack');

module.exports = {
	entry: {
		index:'./src/index.js',
		// vendor: ['React']
	},
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: '[name].[hash].js',
		chunkFilename: '[name].[hash].js',
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
	},
	module: {
		rules:[
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.HashedModuleIdsPlugin(),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "React"
		// }),
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons"
		})
	]

};