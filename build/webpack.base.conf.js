const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")
const fs = require('fs')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const PATHS = {
    src: path.join(__dirname, "../src"),
    dist: path.join(__dirname, "../dist"),
    assets: "assets/"
}

const PAGES_DIR = `${PATHS.src}/otherPages`
const PAGES = fs.readdirSync(PAGES_DIR).filter(filename => filename.endsWith(".html"))

module.exports = {
    // watch: true,
    // watchOptions: {
    //   ignored: /node_modules/,
    //   poll: 1000
    // },
    cache: {  
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '../temporary_cache')
    }, 
    externals: {
        paths: PATHS 
    },
    entry: {
        app: `${PATHS.src}/index.ts`,
        lk: `${PATHS.src}/lk.ts`
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: "/",
        clean: true
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendors",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: "/node_modules/",
            use: {
                loader: "ts-loader"
            }
        },{
			test: /\.js$/,
			exclude: "/node_modules/",
			use: {
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"]
				}
			}
		}, {
            test: /\.(png|jpg|gif|svg)$/,
            type: "asset",
            generator: {
                filename: "assets/img/[name][ext]",
            },
            parser: {
                dataUrlCondition: {
                    maxSize: 4096
                }
            }
        }, {
			test: /\.(ttf|woff|woff2|eot)$/,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[hash][ext][query]'
            }
        }, {
            test: /\.s?css$/,
            use: [
                "style-loader",
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        esModule: false,
                    },
                },
                {
                    loader: "css-loader",
                    options: { sourceMap: true }
                }, {
                    loader: "postcss-loader",
                    options: { 
                        sourceMap: true, 
                        postcssOptions: { 
                            config: `./postcss.config.js`
                        }
                    }
                }, {
                    loader: "sass-loader",
                    options: { sourceMap: true }
                }
            ]
        }]
    },
    resolve: {
        alias: {
            "~": "src",
        },
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[contenthash].css`
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: "index.html",
            inject: false,
            minify: false
        }),
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `otherPages/${page}`,
            inject: false,
            minify: false
        })),
        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
                { from: `${PATHS.src}/static`, to: `${PATHS.assets}static` }
            ]
        }),

    ]
}