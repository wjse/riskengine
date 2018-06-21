const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin  =  require("html-webpack-plugin");
const ExtractTextPlugin   =  require("extract-text-webpack-plugin");

let getHtmlConfig = (name , title) => {
  return {
      title : title,
      template : "./" + name + ".html",
      filename: name + ".html",
      chunks : ["manifest" , name],
      inject : "body",
      hash : true,
      favicon : path.resolve(__dirname,"./src/static/img/favicon.ico")
  };
};

module.exports = {
    entry : {
        index : "./src/app.js",
        big : "./src/component/view/big-screen/index.js"
    },
    plugins : [
        new CleanWebpackPlugin(["dist"]),
        new webpack.optimize.CommonsChunkPlugin({
            name : "manifest"
        }),
        new HtmlWebpackPlugin(getHtmlConfig("index" , "Chart")),
        new HtmlWebpackPlugin(getHtmlConfig("big" , "Big-Screen")),
        new ExtractTextPlugin("assets/css/[name].css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    output : {
        filename : "script/[chunkhash].bundle.js",
        path : path.resolve(__dirname,"./dist"),
        publicPath : "/"
    },
    resolve:{
        extensions:["*",".js",".jsx",".css",".scss"]
    },
    module : {
        rules : [{
            test : /\.css$/,
            use : ["style-loader","css-loader"]
        },{
            test : /\.scss$/,
            use : ExtractTextPlugin.extract({
                fallback : "style-loader",
                use : ["css-loader","sass-loader"]
            })
        },{
            test: /\.(eot|svg|ttf|woff|woff2)\w*/,
            use: [{
                loader : 'url-loader',
                options : {
                    limit : 10000,
                    mimetype : "application/font-woff",
                    name : 'assets/fonts/[hash].[ext]'
                }
            }]
        },{
            test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
            exclude: /favicon\.png$/,
            use: [{
                loader : 'url-loader',
                options : {
                    limit : 10000,
                    name : 'assets/images/[hash].[ext]'
                }
            }]
        },{
            test : /\.xml$/,
            use : ["xml-loader"]
        },{
            test: /\.js$/,
            exclude: /\(node_modules$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react'],
                }
            }
        }]
    }
};