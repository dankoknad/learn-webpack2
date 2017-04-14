const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js'		
	},
	plugins: [new HtmlWebpackPlugin({
		title: 'Webpack 2 is cool',
    template: './src/index.ejs',
		hash: true,
		minify: {
			collapseWhitespace: false
		}
	})]
}