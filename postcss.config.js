module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-sort-media-queries')({
            sort: 'desktop-first'
        }),
        require('cssnano')({
            preset: [
                "default", {
                    discardComments: {
                        removeAll: true
                    }
                }
            ]
        })
    ]
}