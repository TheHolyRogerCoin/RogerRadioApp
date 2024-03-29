const fs = require('fs');
import { DefinePlugin } from 'webpack';
import webpack from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

import { AppConfig } from './config';
import alias from './alias.js';

const rootDir = path.resolve(__dirname, '..');
const BUILD_DIR = path.resolve(rootDir, 'public');

const app_version = fs.readFileSync('VERSION').toString();

const config: webpack.Configuration = {
    output: {
        path: BUILD_DIR,
        filename: '[name].js',
        globalObject: 'self',
        publicPath: '/',
    },
    plugins: [
        new DefinePlugin({
            'process.env.BUILD_EXPIRE': JSON.stringify(process.env.BUILD_EXPIRE),
            'process.env.REACT_APP_GIT_SHA': JSON.stringify(process.env.REACT_APP_GIT_SHA || 'dev'),
            'process.env.APP_VERSION': JSON.stringify(app_version),
        }),
        new webpack.EnvironmentPlugin({
            envType: 'dev',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(rootDir, 'src/app/template.html'),
            hash: true,
            inject: true,
            chunks: ['vendor', 'bundle', 'styles'],
        }),
        // Ignore all locale files of moment.js
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
        new LodashModuleReplacementPlugin({ shorthands: true }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
        }),
        new ESLintPlugin({
            fix: true,
            extensions: ['tsx', 'ts'],
            failOnError: true,
            failOnWarning: true,
        }),
    ],
    optimization: {
        usedExports: true,
        sideEffects: false,
        chunkIds: 'deterministic',
        moduleIds: 'deterministic'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|svg)$/,
                dependency: { not: ['url'] },
                use: 'url-loader',
                type: 'javascript/auto'

            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: alias.webpack,
    },
    externals: {
        config: JSON.stringify({
            app: AppConfig,
        }),
    },
};

// eslint-disable-next-line import/no-default-export
export default config;