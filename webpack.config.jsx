// webpack.config.js

const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    mode: 'development',
    entry: './src/main.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
        fallback: {
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer'),
            process: require.resolve('process/browser'),
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'import.meta.env.VITE_QUEUE_CONNECTION_STRING': JSON.stringify(process.env.VITE_QUEUE_CONNECTION_STRING),
            'import.meta.env.VITE_TOPIC_CONNECTION_STRING': JSON.stringify(process.env.VITE_TOPIC_CONNECTION_STRING),
            'import.meta.env.VITE_QUEUE_NAME': JSON.stringify(process.env.VITE_QUEUE_NAME),
            'import.meta.env.VITE_TOPIC_NAME': JSON.stringify(process.env.VITE_TOPIC_NAME),
            'import.meta.env.VITE_SUBSCRIPTION_NAME': JSON.stringify(process.env.VITE_SUBSCRIPTION_NAME),
            'import.meta.env.VITE_TIMEOUT_IN_MS': JSON.stringify(process.env.VITE_TIMEOUT_IN_MS),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    devServer: {
        static: './dist',
        historyApiFallback: true,
    },
    target: 'web',
};
