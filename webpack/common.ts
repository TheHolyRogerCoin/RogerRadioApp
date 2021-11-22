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

const config: webpack.Configuration = {
    entry: {
        bundle: [path.resolve(rootDir, 'src/index.tsx')],
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js',
        globalObject: 'self',
        publicPath: '/',
    },
    plugins: [
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
        moduleIds: 'deterministic',
        splitChunks: {
            chunks: 'all',
            maxAsyncSize: 50000,
            maxSize: 900000,
            enforceSizeThreshold: 500000,
            maxAsyncRequests: 50,
            maxInitialRequests: 50,
            cacheGroups: {
                styles: {
                    name: 'style',
                    test: /\.(css|sass|scss|pcss)$/,
                    chunks: 'all',
                    minSize: 400000,
                    minChunks: 1,
                    reuseExistingChunk: true,
                },
                vendor: {
                    // test: function (module) {
                    //     console.log(module);
                    // },
                    test: /[\\/]node_modules[\\/](react|react-dom|react-intl|react-redux|react-router|react-bootstrap|history|@formatjs)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    minSize: 400000,
                    minChunks: 1,
                    reuseExistingChunk: true,
                },
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'common',
                    chunks: 'all',
                    minSize: 800000,
                    maxSize: 1200000,
                    minChunks: 1,
                    reuseExistingChunk: true,
                },
                modules: {
                    test: /[\\/]src[\\/](api|modules|routes|store)[\\/]/,
                    name: 'bundlem',
                    chunks: 'all',
                    minSize: 400000,
                    minChunks: 1,
                    reuseExistingChunk: true,
                },
                ui: {
                    test: /[\\/]src[\\/](assets|components|containers|custom|helpers|hooks|mobile|screens|translations)[\\/]/,
                    name: 'bundleu',
                    chunks: 'all',
                    minSize: 400000,
                    minChunks: 1,
                    reuseExistingChunk: true,
                },
            },
        },
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