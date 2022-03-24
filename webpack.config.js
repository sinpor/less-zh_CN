var path = require("path")
var MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	entry: path.resolve(__dirname, "src", "index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	mode: "development",
	// 监听文件变化
	watch: true,
	watchOptions: {
		// 防抖，600ms内的变化合并为同一次打包
		aggregateTimeout: 600,
		// 轮训， 1000没事监测一次
		poll: 1000,
		// 忽略的目录或文件
		ignored: ["node_modules"],
	},
	module: {
		rules: [
			// { test: /\.css$/, loader: "style-loader!css-loader" },
			{
				test: /\.less$/i,
				use: [
					// 从 JS 中创建样式节点
					// { loader: "style-loader" },
					/**
					 * 引入js的css提取到css文件中，
					 * doc： https://webpack.docschina.org/plugins/mini-css-extract-plugin/
					 */
					{ loader: MiniCssExtractPlugin.loader },
					// css转为commonJs中
					{ loader: "css-loader" },
					{
						// 编译less为css
						loader: "less-loader",
						options: {
							lessOptions: {
								strictMath: true,
								noIeCompat: true,
							},
						},
					},
				],
			},
		],
	},
	plugins: [new MiniCssExtractPlugin()],
}
