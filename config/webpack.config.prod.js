const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

const package = require('../package.json');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    publicPath: './',
    assetsPath: './public'
};

module.exports = {
    context: __dirname,
    mode: 'production',
    entry: {
        'public/js/app': [PATHS.src + '/js'],
        // 'public/js/vendors': Object.keys(package.dependencies)
    },
    output: {
        path: PATHS.dist,
        filename: '[name].[chunkhash].js',
        publicPath: PATHS.publicPath
    },
    optimization: {
        runtimeChunk: false,
        splitChunks: false,
        // runtimeChunk: 'single',
        // splitChunks: {
        //     cacheGroups: {
        //         vendors: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: 'public/js/vendors',
        //             enforce: true,
        //             chunks: 'all'
        //         }
        //     }
        // }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.jsm'],
        alias: {
            styles: path.resolve(__dirname, '../src/scss')
        }
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                // If you are having trouble with urls not resolving add this setting.
                                // See https://github.com/webpack-contrib/css-loader#url
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader/url" },
                    { loader: "file-loader" }
                ]
            },
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|png)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(path.join(PATHS.assetsPath, '/css/main.css')),
        new HtmlWebpackPlugin({
            template: '../node_modules/html-webpack-template/index.ejs',
            title: 'Nextel',
            favicon: '../src/img/favicon.ico',
            meta: [{ name: 'robots', content: 'noindex,nofollow' }],
            appMountIds: ['app'],
            inject: false,
            minify: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                preserveLineBreaks: true,
                useShortDoctype: true,
                html5: true
            },
            mobile: true,
            scripts: [PATHS.assetsPath + 'js/all.min.js', PATHS.assetsPath + 'js/main.js']
        }),
        new CopyWebpackPlugin([{
                from: path.join(PATHS.src, PATHS.assetsPath, '/img'),
                to: path.join(PATHS.dist, PATHS.assetsPath, '/img')
            },
            {
                from: path.join(PATHS.src, PATHS.assetsPath, '/third-party'),
                to: path.join(PATHS.dist, PATHS.assetsPath, '/third-party')
            },
            {
                from: path.join(PATHS.src, PATHS.assetsPath, '/js'),
                to: path.join(PATHS.dist, PATHS.assetsPath, '/js')
            }
        ]),
        // new MiniCssExtractPlugin({
        //     filename: '[name].[chunkhash].css'
        // }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true)
        })
    ]
};