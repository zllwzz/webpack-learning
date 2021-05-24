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
        - limit 10 * 1024//图片小于10k,转换成base64
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
- chunkFilename
    - 异步加载的时候使用
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
- contentHash
- chunkHash