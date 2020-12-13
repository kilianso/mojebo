// webpack v4
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
	entry: {main: './src/_webpack/js/main.js'},
	output: {
		path: path.resolve(__dirname, './src/assets'),
		filename: '[name].js'
	},
	optimization: {
		splitChunks: false,
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true, // set to true if you want JS source maps
				uglifyOptions: {
					compress: {
						drop_console: true
					}
				}
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"].map(require.resolve),
						plugins: ["@babel/plugin-transform-spread"]
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{ 
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false,
						}
					},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{ // Inline assets that are in the "inline" folder
				test: /assets\/inline\/.*?\.(png|svg|jpg)$/,
				use: 'base64-inline-loader'
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main.css',
		}),
		new webpack.DefinePlugin({
			'SAMPLEDIR': JSON.stringify('/dummy/home')
		})
	]
};