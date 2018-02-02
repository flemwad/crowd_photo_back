import webpack from 'webpack';
import path from 'path';
import cleanWebpackPlugin from 'clean-webpack-plugin';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const srcIndexJs = path.resolve(appDirectory, 'src/index.js');
const srcPath = path.resolve(appDirectory, 'src');
const outputPath = path.join(appDirectory, '/dist');

module.exports = {
    entry: srcIndexJs,
    output: {
        filename: './bundle.js',
        path: '/',
        publicPath: 'http://localhost:3000/'
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json'],
        alias: {
            'api': path.join(appDirectory, '/src/api'),
            'utils': path.join(appDirectory, '/src/utils')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: srcPath,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: { loader: 'html-loader' }
            }
        ]
    },
    plugins: [
        //TODO: Figure out why this isn't working
        new webpack.HotModuleReplacementPlugin()
    ]
}