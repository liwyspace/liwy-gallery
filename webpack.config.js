'use strict';
var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	resolve: {
	    extensions: ['*', '.js', '.jsx'],
	    alias: {
	      'styles': __dirname + '/src/styles',
	      'data': __dirname + '/src/data',
	      'fonts': __dirname + '/src/fonts',
	      'images': __dirname + '/src/images',
	      'components': __dirname + '/src/components/'
	    }
	},
	entry: {
		main:'components/liwy-gallery.js'
		// vendor: ['React']
	},
	output: {
		path: path.resolve(__dirname,'dist/assets'),
		publicPath: 'assets/',
		filename: '[name].js',
		// chunkFilename: '[name].[hash].js',
	},
	cache: true,
	devtool: 'sourcemap',
	devServer: {
		contentBase: './src',
		hot: true
	},
	stats: {
		colors: true,
		reasons: true
	},
	
	module: {
	    // preLoaders: [{
	    //   	test: /\.(js|jsx)$/,
	    //   	exclude: /node_modules/,
	    //   	loader: 'eslint-loader'
	    // }],
	    rules: [{
	      	test: /\.(js|jsx)$/,
	      	exclude: /node_modules/,
	      	use: ['babel-loader']
	    },
	    {
	      	test: /\.scss/,
	      	use: [
	      		'style-loader',
	      		'css-loader',
	      		// 'autoprefixer-loader?{browsers:["last 2 version", "Firefox 15"]}',
	      		{
	      			loader: 'autoprefixer-loader',
	      			options: {browsers:["last 2 version", "Firefox 15"]}
	      		},
	      		// 'sass-loader?{outputStyle:'compact'}',
	      		{
	      			loader:'sass-loader',
	      			options:{outputStyle:'compact'}
	      		}
	      	]
	    },
	    {
	      	test: /\.css$/,
	      	use: ['style-loader','css-loader','autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}']
	    }, 
	    {
	      	test: /\.json$/,
	      	use: ['json-loader']
	    }, 
	    {
	      	test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
	      	use: ['url-loader?limit=8192']
	    }]
	},
	plugins: [
		new CleanWebpackPlugin(['dist/']),
		new CopyWebpackPlugin([{
			context: 'src',
			from: '*',
			to: path.resolve(__dirname,'dist')
		}]),
		// new HtmlWebpackPlugin({
		// 	template: 'src/index.html'
		// }),
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.HashedModuleIdsPlugin(),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "React"
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "commons"
		// })
	]

};