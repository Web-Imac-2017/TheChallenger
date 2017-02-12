var path = require("path");
var webpack = require("webpack");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },
            {
                test:/\.scss$/, 
                loader: "style-loader!css-loader!sass-loader"
            }
        ]
    }
};

module.exports = config;