'use strict';
var path = require('path');
var webpack = require('webpack');

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
	cache: true,
	module: {
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
	}

};