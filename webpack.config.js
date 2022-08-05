/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require('crypto');
const path = require("path");

const BrotliPlugin = require('brotli-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const nodeExternals = require("webpack-node-externals");

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./src");
const PUBLIC_ROOT = abs("./public");
const DIST_ROOT = abs("./dist");
const DIST_PUBLIC = abs("./dist/public");

const IS_ANALYZE = process.env.ANALYZE === 'true';
const IS_RELEASE = process.env.NODE_ENV === 'production';

/** @type {Array<import('webpack').Configuration>} */
module.exports = [
  {
    devtool: "inline-source-map",
    entry: {
      main: path.join(SRC_ROOT, "client/index.jsx"),
    },
    mode: IS_RELEASE ? "production" : "development",
    module: {
      rules: [
        {
          resourceQuery: (value) => {
            const query = new URLSearchParams(value);
            return query.has("raw");
          },
          type: "asset/source",
        },
        {
          exclude: /[\\/]esm[\\/]/,
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-syntax-dynamic-import"],
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
              ],
            },
          },
        },
      ],
    },
    name: "client",
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        cacheGroups: {
          default: false,
          defaultVendors: false,
          framework: {
            chunks: 'all',
            enforce: true,
            name: 'framework',
            priority: 40,
            test: /[\\/]node_modules[\\/](react|react-dom)/,
          },
          lib: {
            minChunks: 1,
            name(module) {
              const hash = crypto.createHash('sha1');
              hash.update(module.libIdent({ context: __dirname }));
              return hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            reuseExistingChunk: true,
            test(module) {
              return (
                module.size() > 160000 &&
                /node_modules[/\\]/.test(module.nameForCondition() || '')
              );
            },
          },
        },
        maxInitialRequests: 25,
        minSize: 20000,
      },
    },
    output: {
      chunkFilename: "[name].chunk.js",
      filename: "[name].js",
      path: DIST_PUBLIC,
    },
    plugins: [
      IS_ANALYZE && new BundleAnalyzerPlugin(),
      new HtmlWebpackPlugin({
        publicPath: '/',
        scriptLoading: 'defer',
        template: path.join(SRC_ROOT, 'index.html'),
      }),
      new MomentLocalesPlugin({
        localesToKeep: ['ja'],
      }),
      new CopyPlugin({
        patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
      }),
      IS_RELEASE && new BrotliPlugin({
        asset: '[path].br',
        minRatio: 0.8,
        test: /\.(js|css|html|jpg|png)$/,
        threshold: 10240
      }),
    ].filter(Boolean),
    resolve: {
      extensions: [".js", ".jsx"],
    },
    target: "web",
  },
  {
    devtool: "inline-source-map",
    entry: path.join(SRC_ROOT, "server/index.js"),
    externals: [nodeExternals()],
    mode: "development",
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(js|mjs|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: "cjs",
                    spec: true,
                  },
                ],
                "@babel/preset-react",
              ]
            },
          },
        },
      ],
    },
    name: "server",
    output: {
      filename: "server.js",
      path: DIST_ROOT,
    },
    resolve: {
      extensions: [".mjs", ".js", ".jsx"],
    },
    target: "node",
  },
];
