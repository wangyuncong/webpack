
/**
 * @author 王 (https://github.com/wangyuncong)
 * @email 13311285144@163.com
 * @blog http://wangyc.com.cn/
 * @create date 2018-08-09 
 * @desc 静态公共资源打包配置
*/

const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        // 定义程序中打包公共文件的入口文件vendor.js
        lodash: ['lodash'],
        antd: ['antd']
    },
    output: {
        path: path.resolve(__dirname, '../dll'),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
        libraryTarget: 'this'
    },

    plugins: [
        new webpack.DllPlugin({
            // 定义程序中打包公共文件的入口文件vendor.js
            context: process.cwd(),
            // manifest.json文件的输出位置
            path: path.resolve(__dirname, '../dll/[name]-manifest.json'),
            // 定义打包的公共vendor文件对外暴露的函数名
            name: '[name]_[hash]'
        })
    ]
}
