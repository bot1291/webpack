const { merge } = require('webpack-merge');
const baseWebpackConfig = require("./webpack.base.conf")

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig)
})