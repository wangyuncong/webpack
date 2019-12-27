/**
 * @author 高 (https://github.com/gaoxinxiao)
 * @email 18210833386@163.com
 * @create date 2019-8-9 
 * @desc 启动开发环境
*/

const path = require('path')
const paths = require('./paths')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const IP = require('./IP')()
const Chalk = require('chalk')

console.log(Chalk.blue("----------------------------"+IP+":8080"+"----------------------------"))

cssLoader = [
    {
        loader: "css-loader",
        options: {
            importLoaders: 1
        }
    },
    {
        loader: "postcss-loader",
        options: {
            plugins: [
                require("autoprefixer")
            ]
        }
    }, {
        loader: "sass-loader",
        options: {
            sourceMap: true,
            javascriptEnabled: true
        }
    }
]

module.exports = merge(baseConfig, {
    mode: 'development',
    output: {
        // 输出目录
        path: path.resolve(__dirname, "../build"),
        // 文件名称
        filename: "static/js/bundle.js",
        chunkFilename: 'static/js/[name].js'
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, "./build"),
        host: "0.0.0.0",
        port: 8080,
        noInfo:true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'https://openapi-centretest5.bicai365.com/apis/admin', // 要访问接口的域名
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/api': ''//重写接口访问
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                include: paths.appSrc,
                use: [
                    'style-loader',
                    ...cssLoader
                ]
            },
            {
                test: /\.(scss|css)$/,
                include: paths.appNodeModules,
                exclude: paths.appSrc,
                use: [
                    MiniCssExtractPlugin.loader,
                    ...cssLoader
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "static/css/[name].css",
            chunkFilename: "static/css/[id].css"
        })
    ]
})