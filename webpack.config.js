const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ORIGIN = process.env.ORIGIN || 'http://locahost:3000'; //'https://twitt.xyz';

const isProd = process.env.NODE_ENV === 'production';
console.log(`building ${isProd ? 'production' : 'dev'}...`, `server origin: ${ORIGIN}`);

module.exports = {
	entry: {
		app: [
			'./app/index.js',
			'./app/index.scss'
		]
	},
	output: {
		path: __dirname + '/dist/',
		filename: isProd ? '[name].js?v=[chunkhash:4]' : '[name].js',
		publicPath: '/'
	},
	devServer: {
		hot: true,
		contentBase: ['dist'],
		port: 9000,
	},
	// devtool: !isProd && 'sourcemap',
	resolve: {
		extensions: ['.js', '.json'],
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
		}, {
			test: /\.s?css$/,
			use: isProd ? ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					'css-loader',
					{
						loader: 'resolve-url-loader',
						options: {fail: false}
					},
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require('autoprefixer')(['last 2 versions', '> 5%']),
								require('cssnano')()
							]
						},
					}
				]
			}) : [
				'style-loader',
				'css-loader',
				{loader: 'resolve-url-loader', options: {fail: false}},
				'sass-loader'
			]
		}, {
			test: /\.(svg|png|jpg|gif|cur|ttf|eot|woff2?)(\?[a-z0-9]+)?$/,
			loader: 'file-loader?name=[path][name].[ext]?v=[hash:4]',
		}],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': isProd ? {
				NODE_ENV: JSON.stringify('production'),
				ORIGIN: JSON.stringify(ORIGIN),
			} : {},
		}),
		new HtmlWebpackPlugin({
			// hash: true,
			title: 'Twitt',
			template: './app/index.html',
			filename: './index.html',
			chunks: ['app'],
		}),
		...(isProd ? [
			new ExtractTextPlugin(`[name].css${isProd ? '?v=[contenthash:4]' : ''}`)
		] : [])
	],
	externals: {
		'node-fetch': 'fetch',
		'fetch-cookie': true
	}
};
