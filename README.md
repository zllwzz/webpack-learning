```bash
npm init -y
```
- 代码转换
- 代码压缩
- 代码分割
- 模块合并
- 自动刷新
- 代码校验
- 自动发布

### 快速上手
```bash
npm i  webpack webpack-cli -D
```
#### package.json配置
执行的是node_modules > .bin下的命令
```json
"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --open"
}
```

#### 基本配置
- mode 因为开发环境下和生产环境下的webpack配置有很多不一样的地方
    - development
    - production
    - none
- entry 入口 相对路径
    - 如果是字符串就是一个单入口
    - 如果是对象则是多入口
- ouput 输出
    - path 只能是绝对路径
    - filename 输出文件名称
    - publicPath 根路径
- devtool

#### 配置开发服务器
```bash
npm i webpack-dev-server -D
```
- devServer 监控代码发生改变
    - contentBase 产出文件的根目录
    - host 开发服务器监听的主机地址
    - compress 开发服务器是否启动gzip压缩
    - port 开发服务器监听的端口
#### loader
##### 支持加载css 文件
```bash
npm i css-loader style-loader -D
```
##### 支持加载图片
```bash
npm i file-loader url-loader -D
```
- url-loader
    - 内置了file-loader
    - options
        - limit 10 * 1024 //图片小于10k,转换成base64
        - outputPath 输出路径
        - publicPath: 重写output中的publicPath
##### 在html中使用图片
```bash
npm i html-withimg-loader -D
```
##### less sass loader
```bash
npm i less less-loader node-sass sass-loader -D
```
#### plugins
##### html-webpack-plugin
- template 模板文件
- filename 产出后的文件名
- hash 避免缓存
- chunks 按需引入js文件,不设置就会引入所有产出的js文件
- chunksSortMode 对引入代码块进行排序
##### clean-webpack-plugin
- 清除目录
##### mini-css-extract-plugin 分离css
- 因为css的下载和js可以并行，当一个html文件很大的时候，我们可以把css单独提取出来加载
- filename
    - name是代码块chunk的名字
    - 打包出来的css路径 css/[name].[contenthash].css
- chunkFilename
    - 异步加载的时候使用
##### 压缩css和js
```bash
npm i uglifyjs-webpack-plugin terser-webpack-plugin optimize-css-assets-webpack-plugin -D
```
- terser-webpack-plugin替换uglifyjs-webpack-plugin，解决uglifyjs不支持es6的问题
- terser-webpack-plugin
    - parallel 是否开启多进程并行压缩
    - cache 开启缓存
```json
optimization: {
    minimize: true,
    minimizer: [
        new TerserWebpackPlugin({
            parallel: true,
            cache: true
        }),
        new OptimizeCssAssetsWebpackPlugin({})
    ]
}
```
#### 多入口
```js
entry: {
    index: './src/index.js',
    login: './src/login.js'
}
output: {
    path: path.join(__dirname,'dist'),
    filename: '[name].[hash:8].js'// 如果是单入口，chunk的名字是main
}
plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'main.html',
        hash: true,
        chunks: ['common','index'],
        chunksSortMode: 'manual'
    })
]
```
#### hash
- hash
  - 有chunk发生变化，hash就会变化
- contentHash
    - 当前文件内容发生了变化才会变化
- chunkHash
  - 代码块的hash
  - 一般每个entry,都会产出一个chunk
  - chunk中一个文件变化,chunkhash就会变化

#### 文件的指纹
|    占位符名称    |         含义         |
| :---------: | :----------------: |
|     ext     |       资源后缀名        |
|    name     |        文件名称        |
|    path     |      文件的相对路径       |
|   folder    |      文件所在的文件夹      |
| contenthash | 文件的内容hash,默认是md5生成 |
|  chunkHash  | 文件的内容hash,默认是md5生成 |
|    hash     | 文件的内容hash,默认是md5生成 |
|    emoji    | 一个随机的指代文件内容的emoji  |
#### 处理css3前缀
```bash
npm i postcss-loader autoprefixer -D
```
- http://www.caniuse.com
- postcss.config.js
- .browserslistrc

#### 转义es6/es7/jsx
```bash
npm i babel-loader @babel/core @babel/preset-env @babel/preset-react -D
npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
```
```js
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
                ["@babel/plugin-proposal-decorators", {legacy: true}],
                ["@babel/plugin-proposal-class-properties", {loose: true}]
            ]
        }
    }
}
```

#### babel runtime
- babel在每个文件都插入了辅助代码，使代码体积过大
- babel对一些公共方法使用了非常小的辅助代码，比如_extend
- 默认情况下会被添加到每一个需要它的文件中，你可以引入@babel/runtime作为一个独立模块，来避免重复引入
- @babel/plugin-transform-runtime
```bash
npm i @babel/plugin-transform-runtime -D
npm i @babel/runtime -S
```
```js
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
                ["@babel/plugin-proposal-decorators", {legacy: true}],
                ["@babel/plugin-proposal-class-properties", {loose: true}],
                ["@babel/plugin-transform-runtime",{
                    corejs: false,
                    helpers: true,
                    regenerator: true,
                    useESModules: true
                }]
            ]
        }
    }
}