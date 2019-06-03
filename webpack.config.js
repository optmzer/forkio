const path = require('path');
// Plug ins
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
}

// Dev and production mode are set in npm script package.json