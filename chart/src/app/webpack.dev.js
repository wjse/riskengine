const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common , {
    devtool : "inline-source-map",
    devServer : {
        contentBase : "./dist",
        port : 3001
    },
    plugins : [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV" : JSON.stringify("dev")
        })
    ]
});