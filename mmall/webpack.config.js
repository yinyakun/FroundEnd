var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack-dev-server --inline --port 8088
//WEBPACK_DEV=dev webpack-dev-server --inline --port 8088   // 开发环境启动
// WEBPACK_DEV=online webpack-dev-server --inline --port 8088   // 线上环境启动

var getHtmlConfig = function(name,title){
    return{
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        title    : title,
        inject   : true,
        hash     : true,
        chunks   : ["common",name]
    }
}
// 环境变量的配置 dev / online
var WEBPACK_DEV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_DEV);

var config = {
    mode:'development',
    entry: {
        'common' : ['./src/pages/common/index.js'],
        'index' : ['./src/pages/index/index.js'],
        'login' : ['./src/pages/login/login.js'],
        'result' : ['./src/pages/result/index.js']

    },
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath : '/dist/'    
    },
    externals:{
        'jquery' : 'window.jQuery'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|gif|jpeg)\??.*/,
                loader: 'url-loader'
            }
        ]
    },
    plugins : [
        // 把css 单独打包 到文件
        new ExtractTextPlugin("css/[name].css"),
        // html 模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        // html 模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登陆')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))

    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 10,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: 'common'
        }
    },
    //配置别名
    resolve:{
        alias: {
            util : __dirname + '/src/util',
            image : __dirname + '/src/image',
            node_module : __dirname + '/node_modules'
        }
    }
};
if ('dev' === WEBPACK_DEV){
    config.entry.common.push('webpack-dev-server/client?http://locaohost:8088/');
}
module.exports = config;
