/*whenever webpack runs,
it's going to look for a webpack.config.js file 
inside of our project directory*/

/*
Entry: (optional) it’s our main Javascript file where all of the application’s code gets imported
Output: (optional) it’s the resulting Javascript file, bundled by Webpack
Module and rules: it’s the place where you configure the loaders
Plugins: it’s the place where you configure which plugins Webpack will use
*/

/*
Benifits of using CSS loaders in webpack is that we can use bunch of css files for separate modules
*/

const path = require('path'); /*helper from node.js - path module*/
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/index.js', /*webpack will look for this file*/
  output: {
  	path: path.resolve(__dirname,'build'), /*__dirname is a constant in Nodejs referencing currentyl working directory, build is the name of the folder where bundle.js will reside*/
  	filename: 'bundle.js', /*this is a convention to call bundled javascript as bundle.js*/
    publicPath: 'build/'
  },
  module: {
  	rules: [
       {
       	use: 'babel-loader',
       	test: /\.js$/
       },
       {
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader'
        }),
        test: /\.css$/
       },
       {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
           {
            loader: 'url-loader',
            options: { limit: 40000 } /*If the image is greater than 40000 bytes, save it as separate image otherwise include it in bundle.js*/
           },
           'image-webpack-loader'
         ]
       } 
  	]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};

module.exports = config;