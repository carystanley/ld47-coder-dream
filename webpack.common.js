const path = require('path');
const phaser = path.join(__dirname, './node_modules/phaser/dist/phaser.js');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main-game.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: 'assets', to: 'assets' },
            { from: 'src/index.html', to: '' },
        ]),
        new CleanWebpackPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            phaser: phaser
        }
    }
};
