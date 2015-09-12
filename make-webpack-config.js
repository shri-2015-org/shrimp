'use strict'

var path = require('path');
var webpack = require('webpack');
var loadersByExtension = require('./utils/loadersByExtension');


module.exports = function(options) {

	var loadersByExt = loadersByExtension({
		'json': 'json',
		'png|jpg|gif': 'url?limit=5000',
		'woff|woff2': 'url?limit=1',
		'svg': 'url?limit=10000'
	});

	var config = {
		entry: [
			'./app/app.jsx',
			'webpack-dev-server/client?http://localhost:2992',
			'webpack/hot/only-dev-server'
		],
		output: {
			path: path.join(__dirname, 'build'),
			sourceMapFilename: 'debugging/[file].map',
		},

		debug: true,
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }}),
			new webpack.optimize.DedupePlugin()
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

		devtool: '#inline-source-map',

		module: {
			loaders: loadersByExt.concat([
				{
					test: /\.css$/,
					loader: 'style!css'
				},
				{
					test: /\.styl$/,
					loader: 'style!css!stylus'
				},
				{
					test: /\.scss$/,
					loader: 'style!css!sass'
				},
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'react-hot!babel'
				}
			])
		},

		devServer: {
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			port: 2992,
			hot: true
		}
	};

	return config;

}
