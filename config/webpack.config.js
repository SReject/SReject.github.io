const path = require('path');

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const mode = /^pro(?:d(?:uction)?)?$/i.test(process.env.NODE_ENV) ? 'production' : 'development';
const exclude = /(?:^|[\\\/])(?:(?:node_modules)|(?:webpack)|(?:\.vscode)|(?:build))(?:[\\\/]|$)/i;

const tsconfig = path.join(__dirname, '../tsconfig.json');

const config = {
    mode,

    target: 'web',

    entry: path.join(__dirname, '../src/index.ts'),
    output: {
        filename: 'index.js',
        path: path.join(__dirname, '../build/')
    },
    resolve: {
        extensions: ['.js', '.ts'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: tsconfig
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?/i,
                exclude,
                use: [
                    { loader: 'source-map-loader' },
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: tsconfig,
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg|eot|ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[base]',
                }
            },
            {
                test: /\.css$/i,
                exclude,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            emit: true,
                            esModule: false
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            typescript: { configFile: tsconfig }
        }),
        new ESLintWebpackPlugin({
            quiet: true,
            failOnError: true
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        }),
        new HtmlWebpackPlugin({
            title: '2D Procedurally Generated Map',
            filename: 'index.html',
            publicPath: './',
            template: path.join(__dirname, '../src/index.html')
        })
    ],
    devtool: 'source-map',
    stats: 'minimal'
};

module.exports = config;