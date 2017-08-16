'use strict';
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	resolve: {
	    extensions: ['*', '.js', '.jsx'],
	    alias: {
	      'styles': __dirname + '/src/styles',
	      'mixins': __dirname + '/src/mixins',
	      'components': __dirname + '/src/components/'
	    }
	},
	entry: {
		main:'components/liwy-gallery.js'
		// vendor: ['React']
	},
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: '[name].[hash].js',
		// chunkFilename: '[name].[hash].js',
	},
	cache: true,
	devtool: 'sourcemap',
	devServer: {
		contentBase: './dist',
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
	    }
	    // , {
	    //   	test: /\.scss/,
	    //   	loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}!sass-loader?outputStyle=expanded'
	    // }, {
	    //   	test: /\.css$/,
	    //   	loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}'
	    // }, {
	    //   	test: /\.json$/,
	    //   	loader: 'json-loader'
	    // }, {
	    //   	test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
	    //   	loader: 'url-loader?limit=8192'
	    // }
	    ]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		// new webpack.HotModuleReplacementPlugin(),
		// new webpack.HashedModuleIdsPlugin(),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "React"
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "commons"
		// })
	]

};