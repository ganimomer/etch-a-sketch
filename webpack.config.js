const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    module: {
        rules: [{
            test: /\.jsx?$/i,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/react']
                }
            }
        }, {
            test: /\.scss/i,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    devServer: {
        contentBase: './dist'
    }
}