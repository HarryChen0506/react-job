//webpack prod 环境配置 （自己写的）

const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');


module.exports = {
    //入口
    entry:{
        app: [ 
            path.join(__dirname,'../src/index.js')
        ],
        vendor: [
            'react', 
            'react-router-dom', 
            'redux', 
            'react-dom', 
            'react-redux',
            'redux-thunk'
        ]
    }, 
    output: {
        path: path.join(__dirname, '../dist'),
        // 输出到dist文件夹
        filename: 'static/js/[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        // publicPath : '/'
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [ "env","react","es2015","stage-0","stage-2","stage-3"],
                    "plugins": [
                                    [
                                        "import",
                                        {
                                        "libraryName": "antd-mobile",
                                        "style": "css"
                                        }
                                    ],
                                    [
                                        "transform-decorators-legacy"
                                    ],
                                    [
                                        "transform-runtime"
                                    ]
                    ]
                }
            },{
                test: /\.js$/,
                use: ['babel-loader'],  //cacheDirectory缓存编译结果加速
                include: path.join(__dirname, './src')
            },
            {
                test: /\.css$/,
                // loader: 'style-loader!css-loader!postcss-loader',
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader"]
                })
            },                  
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader'
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: ["css-loader", "postcss-loader","sass-loader"]
                // })
            },{
                test: /\.(jpg|gif|png|jpeg|bmp)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'static/media/[name].[hash:8].[ext]',
                    }
                }
            },{ 
                test:/\.(woff|woff2|svg|ttf|eot)($|\?)/i, 
                use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
            } // 限制大小
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),        
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon: path.join(__dirname, '../public/favicon.ico'),
            template: path.join(__dirname, '../public/index.html')
        }),
         new CleanWebpackPlugin(['../dist/*.*'],{
            root: path.join(__dirname,"./"),
            verbose: true,
            dry: false
        }),
        new ExtractTextPlugin({
            filename: 'static/css/[name].[contenthash].css',
            allChunks: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({   //引用资源单独打包
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new UglifyJSPlugin(),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
        }),
    ],
    resolve: {
        alias: {
           'react-native': 'react-native-web',
            container: path.join(__dirname, '../src/container'),
            component: path.join(__dirname, '../src/component'),
            redux_module: path.join(__dirname, '../src/redux_module'),
            http_service: path.join(__dirname, '../src/http_service'),
            utils:  path.join(__dirname, '../src/utils'),
            static:  path.join(__dirname, '../src/static'),
        }
    }
}