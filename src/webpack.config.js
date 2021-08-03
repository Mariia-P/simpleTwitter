const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './js/index.js')
    },
    output: {
        filename: 'js/bundle.min.js',
        path: path.resolve(__dirname, 'build')
    },

    devServer: {
                contentBase: path.join(__dirname, 'dist'),
                compress: false,
                port: 9000,
                open: true,
                overlay: true
            },
        devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    //                     'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },

            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]',
                    outputPath: 'images'
                }
            }           
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.min.css'
        }),

        new CleanWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin()
    ]
};
