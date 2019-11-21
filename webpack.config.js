// webpack v4
// webpack v4
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const IS_PROD = (process.env.NODE_ENV === 'production');
const ASSETS_URL = '/assets/';

const PATHS = {
	SRC_DIR: path.resolve(__dirname, 'src/_webpack'),
	ASSET_SRC_DIR: path.resolve(__dirname, 'src/_webpack/assets'),
	ASSET_OUTPUT_DIR: path.resolve(__dirname, 'src/assets'),
	MODULES: path.resolve(__dirname, 'src/_includes/_modules'),
	SUBMODULES: path.resolve(__dirname, 'src/_includes/_submodules'),
	SCSS_DIR: path.resolve(__dirname, 'src/_webpack/scss'),
	JS_DIR: path.resolve(__dirname, 'src/_webpack/js')
};

module.exports = {
	entry: {
		main: path.resolve(PATHS.SRC_DIR, 'js/main.js')
	},
	output: {
		path: PATHS.ASSET_OUTPUT_DIR,
		filename: IS_PROD ? '[name].js' : '[name].dev.js',
		publicPath: ASSETS_URL
	},
	resolve: {
		alias: {
			"_js": PATHS.JS_DIR,
			"_m": PATHS.MODULES,
			"_s": PATHS.SUBMODULES,
			"_scss": PATHS.SCSS_DIR,
			"_assets": PATHS.ASSET_SRC_DIR
		}
	},
	optimization: {
		splitChunks: false,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
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
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: [
									// SCSS Files can be both in modules and scss folder
									PATHS.SCSS_DIR,
									PATHS.MODULES,
									PATHS.SUBMODULES
								]
							}
						}
					}
				]
			},
			{ // Inline assets that are in the "inline" folder
				test: /assets\/inline\/.*?\.(png|svg|jpg)$/,
				use: 'base64-inline-loader'
			},
			{ // Write fonts into the fonts folder
				test: /\.(ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'fonts'
				}
			},
			{ // Write images to the images folder
				test: /assets\/images\/.*?\.(png|svg|jpg)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'images'
				}
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: IS_PROD ? '[name].css' : '[name].dev.css'
		}),
		new webpack.DefinePlugin({
			'IS_PROD': IS_PROD,
			'IS_DEV': !IS_PROD
		})
	],
	devtool: !IS_PROD && "source-map"
};
