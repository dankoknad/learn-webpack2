const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js'		
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						'sass-loader'
					],
					publicPath: '/dist'
	      })								
			},{
				test: /\.(js|jsx)$/,
				use: ['babel-loader'],
				exclude: /node_modules/							
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 3030,
		stats: 'errors-only',
		open: true		
	},
	plugins: [new HtmlWebpackPlugin({
		title: 'Webpack 2 is cool',
    template: './src/index.ejs',
		hash: true,
		minify: {
			collapseWhitespace: false
		}
	}),
	new ExtractTextPlugin({
		filename: 'bundle.css',
		disable: false,
		allChunks: true
	})]
}