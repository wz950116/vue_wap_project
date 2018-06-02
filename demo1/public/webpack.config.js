var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
require('babel-polyfill');

var publicPath = '';

module.exports = {
    entry: {
        app: ['babel-polyfill', path.resolve(__dirname, '../src/main.js')],
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),
        publicPath: publicPath,
        filename: "[name].[hash].js"
    },
    resolve: {
        alias: {
            'components': path.resolve(__dirname, '../src/components'),
            'static': path.resolve(__dirname, '../src/static'),
            'lib': path.resolve(__dirname, '../src/lib'),
            'utils': path.resolve(__dirname, '../src/utils'),
            'model': path.resolve(__dirname, '../src/model'),
            'view': path.resolve(__dirname, '../src/view')
        },
        extensions: ['.js', '.handlebars', '.json', 'less', '.vue']
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }, {
            test: /\.html$/,
            loader: 'html-withimg-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.(png|jpg|jpeg|gif)$/i,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'img/[name].[ext]'
            }
        }, {
            test: /\.woff/,
            loader: 'url?prefix=font/&limit=10000&mimetype=application/font-woff',
            query: {
                limit: 10000,
                name: 'img/[name].[ext]'
            }
        }, {
            test: /\.(ttf|eot|svg)/i,
            loader: 'file?prefix=font/',
            query: {
                limit: 10000,
                name: 'img/[name].[ext]'
            }
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        historyApiFallback: true,
        port: 1234,
        inline: true,
        host: '10.0.121.137',
        disableHostCheck: true  // 禁用host的授权检测
    },
    plugins: [
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            inject: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};
