const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    devtool: 'source-map',
    context: __dirname,
    entry: {
        'bundle': path.join(__dirname, 'app', 'client.js')
    },
    externals : {
        'three' : 'THREE',
        'rxjs/Rx' : 'Rx'
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: "[name].js"
    },
    devServer: {
        contentBase: path.resolve(__dirname, './public'),
        inline: true,
        historyApiFallback: true,
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
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['react', 'es2015', 'stage-0']}
            }]
        },{
            test: /\.s?css$/,
            exclude: /main\.s?css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?modules&importLoaders=1&localIdentName=[name]___[local]___[hash:base64:5]',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: ['app/styles/_variables.scss']
                        }
                    }
                ]
            })
        },{
            test: /main\.s?css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new CopyWebpackPlugin([{
            from: 'app/assets',
            to: 'assets'
        }])
    ]
};
