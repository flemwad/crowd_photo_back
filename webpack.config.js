import webpack from 'webpack';
import path from 'path';
import cleanWebpackPlugin from 'clean-webpack-plugin';

const ENTRY_PATH = path.resolve(__dirname, 'src', 'index.js');
const OUTPUT_PATH = path.join(__dirname, 'dist');

module.exports = {
    entry: [
        // For hot style updates
        'webpack/hot/dev-server',
        ENTRY_PATH
    ],
    output: { 
        filename: './bundle.js', 
        path: OUTPUT_PATH, 
        publicPath: 'http://localhost:3000/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {loader: 'html-loader'}
            }
        ]
    },
    plugins: [
        //TODO: Figure out why this isn't working
        new webpack.HotModuleReplacementPlugin() 
    ]
}