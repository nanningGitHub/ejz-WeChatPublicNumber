var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // 页面入口文件配置
    entry : {
        'view/main/index': './js/view/main/index.js',
    },
    // 入口文件输出配置
    output : {
        path : __dirname + '/output/js/',
        filename : '[name].bundle.js'
    },
    externals: [
        {
            'react': 'window.React'
        },
        {
            'react-dom': 'window.ReactDOM'
        },
        {
            'react-router': 'window.ReactRouter'
        }
    ],
    module: {
        // 加载器配置
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query:{
                    presets: ['es2015','react','stage-0'],
                    plugins: [
                        ["import", [
                            { "style": "css", "libraryName": "antd-mobile" }
                        ]]
                    ]
                }
            },
            {
                // edit this for additional asset file types
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=819200'
            },
            {   test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
            }
        ]
    },
    // 其他解决方案配置
    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.js', '.jsx', '.css', '.json'],
    },
    // 插件项
    plugins : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new ExtractTextPlugin("bundle.css"),
    ]
}