const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

const checkGameMode = (gameMode) => process.env.GAME_MODE === gameMode;
const checkEnvironment = (env) => process.env.NODE_ENV === env;
const PORT = 7300;
const isProd = checkEnvironment("production");
const isDev = !isProd;

const filename = (ext) => (isProd ? `bundle.[contenthash].${ext}` : `bundle.${ext}`);

const transferAssets = (assets) => {
	return {
		from: path.resolve(__dirname, `src/${assets}`),
		to: path.resolve(__dirname, `build/${assets}`)
	};
};

const minimizer = () => {
	const settings = [];

	if (isProd) {
		settings.push(new CssMinimizerPlugin());
		settings.push(new TerserPlugin());
	}

	return settings;
};

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: ["@babel/polyfill", "./scripts/index.ts"],
	output: {
		filename: `scripts/${filename("js")}`,
		path: path.resolve(__dirname, "./build")
	},
	devtool: isDev ? "source-map" : false,
	devServer: {
		host: isProd ? "0.0.0.0" : "localhost",
		port: PORT,
		open: isDev,
		hot: isDev
	},

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src/scripts"),
			"@data": path.resolve(__dirname, "src/scripts/data"),
			"@enums": path.resolve(__dirname, "src/scripts/enums"),
			"@utils": path.resolve(__dirname, "src/scripts/utils"),
			"@types": path.resolve(__dirname, "src/scripts/types"),
			"@ui": path.resolve(__dirname, "src/scripts/ui"),
			"@config": path.resolve(__dirname, "src/scripts/config")
		},
		extensions: [".tsx", ".ts", ".js", ".json"]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./index.html",
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd
			}
		}),
		new CopyPlugin({
			patterns: [transferAssets("fonts"), transferAssets("sprites")]
		}),
		new MiniCssExtractPlugin({
			filename: `styles/${filename("css")}`
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			DEVELOPMENT: checkEnvironment("development"),
			PRODUCTION: checkEnvironment("production"),
			CHEAT_TOOL: checkGameMode("cheat_tool"),
			FUN: checkGameMode("fun"),
			LOGS: checkGameMode("logs")
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: "asset/inline"
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.tsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: [{loader: "ts-loader", options: {transpileOnly: true}}]
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: minimizer()
	}
};
