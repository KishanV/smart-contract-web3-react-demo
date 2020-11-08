var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
    devServer: {
        host: "0.0.0.0",
        port: 16000,
        hot: true,
        contentBase: path.resolve(__dirname, "src"),
        publicPath: "/"
    },
    plugins: [
        new webpack.WatchIgnorePlugin([
            /css\.d\.ts$/
        ]),
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: "inline-source-map",
    entry: ["webpack/hot/only-dev-server", "./src/index.tsx"],
    output: {
        filename: "[name].js",
        chunkFilename: "[name].js",
        path: path.join(__dirname, "/build")
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                src: {
                    test: /[\\/]src[\\/]/,
                    name(module) {
                        const src = module.context
                            .split("/")
                            .join(".")
                            .substr(1);
                        return `${src}`;
                    }
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    "style-loader?sourceMap", // creates style nodes from JS strings
                    "css-loader?sourceMap", // translates CSS into CommonJS
                    "sass-loader?sourceMap"
                ],
                exclude: /\.module\.scss$/
            }, {
                test: /\.(scss)$/,
                use: [
                    "style-loader?sourceMap",
                    {
                        loader: "typings-for-css-modules-loader",
                        options: {
                            sourceMap: true,
                            namedExport: true,
                            localIdentName: '[local]----[hash:base64:5]',
                            modules: true
                        }
                    },
                    "sass-loader?sourceMap"
                ],
                include: /\.module\.scss$/
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
        modules: [path.resolve(__dirname, "./src"), "node_modules"],
        extensions: [".ts", ".tsx", ".js", ".json"]
    }
};
