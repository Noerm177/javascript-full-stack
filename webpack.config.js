const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {

    entry: './frontend/app.js',//principal
    output: {
        path: path.join(__dirname, 'backend/public'),//aqui guarda
        filename: 'js/bundle.js'
    },
    mode: 'development',
    
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                   devMode ? 'style-loader' : MiniCssExtractPlugin.loader ,
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            minify: {//comprimir html lineas
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true

            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bunle.css'
        })

    ],
    devtool: 'source-map'

};