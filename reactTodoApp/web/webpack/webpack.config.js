var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
    entry: {
        javascript: "index.js",
        html: "public/index.html"
    },
    output: {
        path: __dirname + "/dist",
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'react-native': 'react-native-web'
        },
        extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                // test: /\.jsx?$/,
                // exclude: /node_modules/,
                // loaders: ["babel-loader"]
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"],
            },
            {
                test: /\.html$/,
                include: /public/,
                loader: "file?name=[name].[ext]"
            },
        ]
    }
};

module.exports = config;