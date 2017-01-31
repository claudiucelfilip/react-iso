const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: path.join(__dirname, 'app', 'client.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        inline: true,
        proxy: {
            '/': {
                target: 'http://127.0.0.1:3000',
                secure: false
            }
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['react', 'es2015']}
            }]
        }]
    }
};