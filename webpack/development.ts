import { HotModuleReplacementPlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import merge from 'webpack-merge';
import 'webpack-dev-server';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import commonConfig from './common';

const config = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        new HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                memoryLimit: 4096,
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(css|sass|scss|pcss)$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        }
                    },
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            poolTimeout: Infinity,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        compress: false,
        port: 3000,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, '../public'),
        },
    },
});

// eslint-disable-next-line import/no-default-export
export default config;
