import { DefinePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import merge from 'webpack-merge';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const rootDir = path.resolve(__dirname, '..');
const BUILD_DIR = path.resolve(rootDir, 'build');

import commonConfig from './common';

const plugins = [
    new DefinePlugin({ 'process.env.BUILD_EXPIRE': JSON.stringify(process.env.BUILD_EXPIRE) }),
    new CssMinimizerPlugin({
        test: /\.css$/g,
        minimizerOptions: [
            {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
        ],
        minify: [
            CssMinimizerPlugin.cssnanoMinify,
        ]
    }),
    new CopyWebpackPlugin({
        patterns: [{ from: 'public' }],
    }),
];

if (process.env.ANALYZE === '1') {
    plugins.push(new BundleAnalyzerPlugin());
}

const config = merge(commonConfig, {
    entry: {
        bundle: [path.resolve(rootDir, 'src/index_mobile_android.tsx')],
    },
    mode: 'production',
    output: {
        path: BUILD_DIR,
        filename: '[name].[fullhash].js',
        globalObject: 'self',
        publicPath: '/',
    },
    optimization: {
        usedExports: false,
        minimize: true,
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
    plugins,
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
                    'postcss-loader'
                ],
            },
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: false,
                            happyPackMode: false,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    stats: {
        children: false,
    },
});

// eslint-disable-next-line import/no-default-export
export default config;