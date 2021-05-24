const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry:'./src/index.js',//入口文件
    // entry: {
    //     index: './src/index.js',
    //     login: './src/login.js'
    // },
    // entry: {
    //     index: './src/index.js',
    //     common: './src/common.js'
    // },
    devtool: 'eval',
    output: {
        path: path.join(__dirname,'dist'),
        // filename: '[name].[hash:8].js',
        filename: 'bundle.js',
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
                test:/\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg)$/,
                // use: 'file-loader'
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024//图片小于10k,转换成base64
                    }
                }
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
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
}