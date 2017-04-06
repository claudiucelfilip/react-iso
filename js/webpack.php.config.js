const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    devtool: 'source-map',
    context: __dirname,
    entry: {
        'foo': path.join(__dirname, 'app', 'foo.js')
    },
    externals : {
        'three' : 'THREE',
        'rxjs/Rx' : 'Rx'
    },
    resolveLoader: {
        alias: {
            'ssr-loader': path.join(__dirname, './ssr-loader')
        }
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        libraryTarget: 'global'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: 'ssr-loader',
                    query : {
                        excludedModules : ['three', 'rxjs']
                    }
                },
                {
                    loader: 'babel-loader',
                    options: { presets: ['react', 'es2015', 'stage-0']}
                }
            ]
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
        }]),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: false,
        //     beautify: true,
        //     mangle: false
            // output: {
            //     comments: false,
            //
            // }
        // })
    ]
};
