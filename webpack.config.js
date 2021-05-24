const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'development',
    entry:'./src/index.js',//入口文件
    // entry: {
    //     index: './src/index.js',
    //     login: './src/login.js',
    //      vendor: glob.sync('./node_modules/**/*.js)
    // },
    // entry: {
    //     index: './src/index.js',
    //     common: './src/common.js'
    // },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                parallel: true,
                cache: true
            }),
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    },
    devtool: 'eval',
    output: {
        path: path.join(__dirname,'dist'),
        filename: '[name].[hash].js',
        // filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname,'dist'),
        port: 8081,
        host: 'localhost',
        compress: true
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", {legacy: true}],["@babel/plugin-proposal-class-properties", {loose: true}],["@babel/plugin-transform-runtime",{
                                corejs: false,
                                helpers: true,
                                regenerator: true,
                                useESModules: true
                            }]
                        ]
                    }
                }
            },
            {
                test:/\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader']
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg)$/,
                // use: 'file-loader'
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024,//图片小于10k,转换成base64
                        outputPath: 'images',
                        publicPath: '/images',
                        esModule: false//没有它，html-withimg-loader会出问题
                    }
                }
            },
            {
                test: /\.(html|htm)$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','less-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            hash: true,
            // chunks: ['common','index'],
            // chunksSortMode: 'manual'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: '[id].css',
        })
    ]
}