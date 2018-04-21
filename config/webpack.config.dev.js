const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

const package = require('../package.json');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    publicPath : '/'
};

// const extractCSS = new ExtractTextPlugin('../src/public/css/main.css');

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        'public/js/app': [PATHS.src+'/js'],
        vendors: Object.keys(package.dependencies)
    },
    output: {
        path: PATHS.dist,
        filename: '[name].js',
        publicPath: PATHS.publicPath
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.jsm'],
        alias: {
            styles: path.resolve(__dirname, '../src/scss')
        }
    },
    devtool: 'eval',
    module: {
        rules: [{
                test: /.(scss)$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: 'dashes',
                            localIdentName: '[path][name]__[local]'
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                ]
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
            // {
            //     test: /\.css$/,
            //     use: extractCSS.extract(['css-loader', 'sass-loader', 'resolve-url-loader'])
            // },
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: '../node_modules/html-webpack-template/index.ejs',
        //     title: 'Nextel',
        //     favicon: '../src/img/favicon.ico',
        //     meta: [{ name: 'robots', content: 'noindex,nofollow' }],
        //     appMountIds: ['app'],
        //     inject: false,
        //     minify: {
        //         collapseWhitespace: true,
        //         conservativeCollapse: true,
        //         preserveLineBreaks: true,
        //         useShortDoctype: true,
        //         html5: true
        //     },
        //     mobile: true,
        //     scripts: ['public/js/all.min.js', 'public/js/main.js']
        // }),
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
            scripts: ['/public/js/all.min.js', '/public/js/main.js']
        }),
        // extractCSS,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.join(PATHS.src , '/public/img'),
                to: path.join(PATHS.dist , '/public/img')
            },
            {
                from: path.join(PATHS.src ,'/public/third-party'),
                to: path.join(PATHS.dist , '/public/third-party')
            },
            {
                from: path.join(PATHS.src ,  '/public/js'),
                to: path.join(PATHS.dist ,  '/public/js')
            },
            {
                from: path.join(PATHS.src ,  '/public/css'),
                to: path.join(PATHS.dist , '/public/css')
            }
        ]),
        // new ExtractTextWebpackPlugin('main.css'),
        // new StyleExtHtmlWebpackPlugin({
        //     position: 'head-bottom'
        // }),
        // new ExtractTextPlugin('../dist/public/css/main.css'),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false)
        })
    ],
    devServer: {
        contentBase: PATHS.dist,
        compress: true,
        headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY'
        },
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 8080,
        publicPath: 'http://localhost:8080/',
        hot: true
    },
    stats: {
        children: false
    }
};