/*
 * @Author: PiPi
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-04-20 10:17:45
 * @LastEditors: PiPi
 * @LastEditTime: 2020-04-20 10:35:01
 */
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'./lib'),
        filename: 'axm.umd.min.js',
        publicPath: '/lib',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
};