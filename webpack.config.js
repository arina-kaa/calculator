const path = require('path')

module.exports = {
	entry: './src/index.ts',
	stats: 'errors-warnings',
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
}
