import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import merge from 'webpack-merge';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import JavaScriptObfuscator from 'webpack-obfuscator';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const rootDir = path.resolve(__dirname, '..');
const BUILD_DIR = path.resolve(rootDir, 'build');

import commonConfig from './common';

const domain = process.env.BUILD_DOMAIN ? process.env.BUILD_DOMAIN.split(',') : [];

const plugins = [
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
    new JavaScriptObfuscator({ rotateUnicodeArray: true, domainLock: domain }),
];

if (process.env.ANALYZE === '1') {
    plugins.push(new BundleAnalyzerPlugin());
}

const config = merge(commonConfig, {
    entry: {
        bundle: [path.resolve(rootDir, 'src/index_web.tsx')],
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