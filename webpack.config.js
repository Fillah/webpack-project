const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        app: [
            '@babel/polyfill',
            './src/main.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name]-[hash].js',
        publicPath: '/'
    },
    devServer: {
        inline: false,
        contentBase: "./dist",
        overlay: true,
        hot: true,
        stats: {
            colors: true
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.css$/,
                loader: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
        // service worker caching
        new SWPrecacheWebpackPlugin(
            {
                cacheId: 'webpack-project',
                filename: 'service-worker.js',
                staticFileGlobs: [
                    'dist/**/*.{js,css}',
                    '/'
                ],
                minify: true,
                stripPrefix: 'dist/',
                dontCacheBustUrlsMatching: /\.\w{6}\./
            }
        )
    ]
}