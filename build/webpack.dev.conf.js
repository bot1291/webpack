const webpack = require("webpack")
const { merge } = require('webpack-merge');
const baseWebpackConfig = require("./webpack.base.conf")

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    devServer: {
        port: 8081,
        hot: true,
        watchFiles: [`${baseWebpackConfig.externals.paths.src}/**/*`],
        client: {
            overlay: {
                warnings: true,
                errors: true
            }
        },
        static: baseWebpackConfig.externals.paths.dist
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
        })
    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
})