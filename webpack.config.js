"use strict";
var webpack = require("webpack");

var IS_PRODUCTION = process.env.NODE_ENV === "production";
var PRODUCTION_HOSTNAME = process.env.HOSTNAME || "localhost";

console.log( IS_PRODUCTION ? "Production Mode" : "Development Mode");

var config = {};

config.output = {
    path: __dirname + "/dist/",
    filename: "bundle.js",
    publicPath: IS_PRODUCTION ? "http://localhost:8080/" : "http://localhost:8080/"
}

config.resolve = {
    extensions: ["", ".js", ".jsx"],
    root : __dirname,
    /*
     * We need to alias React because of how react-hot-loader
     * transforms modules to require react and react/lib/ReactMount
     */
    // alias: {
    //     react: __dirname + "/node_modules/react"
    // },
}

config.module = { loaders: [
    { test: /\.scss$/, loaders: ["style", "css", "sass"]},
    { test: /\.css$/, loaders: ["style", "css" ]},
    { test: /\.md$/, loaders:  ["html", "remarkable"]},
    { test: /\.html$/, loaders:  ["html"]},
    { test: /\.json$/, loaders: ["json"]},
    { test: /\.jsx?$/, loaders: IS_PRODUCTION ? ["babel?stage=0"] : ["react-hot", "babel?stage=0"] , exclude: /node_modules/},
    { test: /\.(png|jpg|jpeg|gif|svg)$/, loaders: ["url?limit=10000"]},
    { test: /\.(woff|woff2)$/, loaders: ["url?limit=100000"]},
    { test: /\.(ttf|eot)$/, loaders: ["file"]},
    { test: /\.(mp3|wav)$/, loaders: ["file"]}
]};

config.remarkable = {
    breaks: true,
    html: true
};


config.entry = IS_PRODUCTION
    ?
    [ 
        "./app/entry.jsx"
    ]
    : 
    [ 
        "webpack-dev-server/client?http://localhost:8080",
        "webpack/hot/only-dev-server",
        "./app/entry.jsx"
    ];




config.plugins = IS_PRODUCTION
    ?
    [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin()
    ]
    : 
    [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ];

config.devtools = IS_PRODUCTION ? undefined : "source-map"


module.exports = config;
