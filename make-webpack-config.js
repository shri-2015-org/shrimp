'use strict'

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = function(options) {
	var config = {
		context: '.',
		entry: './app/app.jsx',
		output: {
			path: 'build'
		},
		plugins: [
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.DedupePlugin(),
			new ExtractTextPlugin('styles.css')
		],
		resolve: {
			root: path.join(__dirname, 'app'),
			extensions: ['', '.js', '.jsx'],
			modulesDirectories: [
				'app',
				'node_modules'
			],
		},
		resolveLoader: {
			root: [
				path.join(__dirname, 'node_modules'),
				__dirname
			]
		},
		module: {
			loaders: [
				{
					test: /\.css$/,
					loader: 'style!css'
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract('style!css!sass')
				},
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loaders: ['jsx', 'babel']
				}
			]
		}
	};

	return config;

}
