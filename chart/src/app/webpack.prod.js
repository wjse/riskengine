const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common , {
    plugins : [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV" : JSON.stringify("prod")
        })
    ]
});