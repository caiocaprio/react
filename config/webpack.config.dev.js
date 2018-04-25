const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const webpack = require('webpack');
const path = require('path');


const package = require('../package.json');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    publicPath: '/',
    assetsPath: '/public'
};

// const extractSass = new ExtractTextPlugin({
//     filename: "[name].[contenthash].css"
//     // disable: process.env.NODE_ENV === "development"
// });

// const extractCSS = new ExtractTextPlugin('css/[name].css');

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        'public/js/app': [PATHS.src + '/js'],
        'public/js/all': [
            PATHS.src + '/public/third-party/material-kit/assets/js/core/jquery.min.js',
            PATHS.src + '/public/third-party/material-kit/assets/js/core/popper.min.js',
            PATHS.src + '/public/third-party/material-kit/assets/js/bootstrap-material-design.js',
            PATHS.src + '/public/third-party/material-kit/assets/js/plugins/moment.min.js',
            PATHS.src + '/public/third-party/material-kit/assets/js/plugins/bootstrap-datetimepicker.min.js',
            PATHS.src + '/public/third-party/material-kit/assets/js/plugins/nouislider.min.js',
            PATHS.src + '/public/third-party/material-kit/assets/js/plugins/bootstrap-selectpicker.js',
            PATHS.src + '/public/third-party/material-kit/assets/js/plugins/bootstrap-tagsinput.js',
            PATHS.src + '/public/third-party/material-kit/assets/js/plugins/jasny-bootstrap.min.js',
            PATHS.src + '/public/third-party/material-kit/assets/js/plugins/jquery.flexisel.js',
            PATHS.src + '/public/third-party/material-kit/assets/assets-for-demo/js/modernizr.js',
            PATHS.src + '/public/third-party/material-kit/assets/js/material-kit.min.js',
            PATHS.src + '/public/js/bundle/**/*.js',
            PATHS.src + '/public/js/main.js'
        ],
        'public/js/vendors': Object.keys(package.dependencies)

    },
    output: {
        path: PATHS.dist,
        filename: '[name].js',
        publicPath: PATHS.publicPath
    },
    optimization: {
        runtimeChunk: 'single',
        // runtimeChunk: false,
        // splitChunks: false,
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'public/js/vendors',
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
        rules: [
            // {
            //     test: /.(scss)$/,
            //     use: [{
            //             loader: 'style-loader'
            //         },
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 modules: true,
            //                 camelCase: 'dashes',
            //                 localIdentName: '[path][name]__[local]'
            //             }
            //         },
            //         {
            //             loader: 'resolve-url-loader'
            //         },
            //         {
            //             loader: 'sass-loader'
            //         },
            //     ]
            // },
            {
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
                loader: 'babel-loader',

            },
            {
                test: /\.(jpg|png)$/,
                use: 'file-loader'
            }
            // {
            //     test: /\.css$/,
            // use: extractCSS.extract(['css-loader', 'sass-loader', 'resolve-url-loader'])
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
        // extractCSS,
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
            scripts: [PATHS.assetsPath + '/js/all.min.js', PATHS.assetsPath + '/js/main.js']
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new CopyWebpackPlugin([{
                from: path.join(PATHS.src, PATHS.assetsPath, '/img'),
                to: path.join(PATHS.dist, PATHS.assetsPath, '/img')
            },
            {
                from: path.join(PATHS.src, PATHS.assetsPath, '/third-party'),
                to: path.join(PATHS.dist, PATHS.assetsPath, '/third-party')
            },
            // {
            //     from: path.join(PATHS.src, PATHS.assetsPath, '/js'),
            //     to: path.join(PATHS.dist, PATHS.assetsPath, '/js')
            // },
            // {
            //     from: path.join(PATHS.src, PATHS.assetsPath, '/css'),
            //     to: path.join(PATHS.dist, PATHS.assetsPath, '/css')
            // }
        ]),

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