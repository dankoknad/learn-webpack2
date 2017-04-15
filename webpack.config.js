const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader','css-loader','sass-loader'];
const cssProd = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: [
		'css-loader',
		'sass-loader'
	],
	publicPath: '/dist'
});
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
	entry: {
		app: './src/app.js',
		contact: './src/contact.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'		
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: cssConfig								
			},{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/							
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 3030,
		hot: true,
		// stats: 'errors-only',
		open: true		
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'App is here',
			template: './src/index.ejs',
			excludeChunks: ['contact'],
			hash: true
		}),
		new HtmlWebpackPlugin({
			title: 'Webpack 2 is cool',
			template: './src/contact.ejs',
			filename: 'contact.html',
			chunks: ['contact'],
			hash: true
		}),
		new ExtractTextPlugin({
			filename: '[name].bundle.css',
			disable: !isProd,
			allChunks: true
		}),
		new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
	]
}
