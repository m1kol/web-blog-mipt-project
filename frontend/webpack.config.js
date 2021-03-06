const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Блог',
            template: path.resolve(__dirname, './template.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin()
    ],
    devtool: 'inline-source-map',
    optimization: {
        runtimeChunk: 'single'
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, './dist'),
            watch: true,
        },
        open: true,
        port: 8000,
        hot: true,
        proxy: {
            '/': 'http://127.0.0.1:8008'
        },
        client: {
            logging: 'error',
            overlay: false,
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(ico|gif|png|jpg|jpeg)$/,
                type: 'asset/resource'
            }
        ]
    }
}