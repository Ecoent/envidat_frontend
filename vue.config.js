/**
 * @summary config of vue cli services and it's webpack
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:12:30
 * Last modified  : 2019-10-23 16:58:48
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
/* eslint-disable no-console */

const fs = require('fs');
const dotenv = require('dotenv');

const path = require('path');
const webpack = require('webpack');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const CopywebpackPlugin = require('copy-webpack-plugin');

dotenv.config();
process.env.VUE_APP_VERSION = require('./package.json').version;

const version = process.env.VUE_APP_VERSION;

if (process.env.NODE_ENV === 'production') {
  const fileName = `version_${version}.txt`;
  const filePath = `${__dirname}/public/${fileName}`;

  fs.writeFile(filePath, version, (err) => {

    if (err) {
      return console.log(`Tried to created file ${fileName}. Error: ${err}`);
    }

    return console.log(`Created version file ${fileName} for easy build version highlight.`);
  });
}

console.log(`starting ${version} with use of testdata '${process.env.VUE_APP_USE_TESTDATA}' on ${process.env.NODE_ENV}`);

module.exports = {
  publicPath: './',
  assetsDir: './static',
  runtimeCompiler: true,
  css: {
    // extract: { filename: 'styles.css' },
    modules: false,
    sourceMap: true,
    // loaderOptions: {
    //   css: {
    //     url: true,
    //     // import: true,
    //     // localIdentName: '[local]_[hash:base64:8]',
    //   },
    //   // postcss: {
    //   //   // "postcss-import": {},
    //   //   // "postcss-url": {},
    //   //   // to edit target browsers: use "browserslist" field in package.json
    //   //   "autoprefixer": {}
    //   // }
    // }
  },
  pluginOptions: {
    storybook: {
      allowedPlugins: ['define'],
    },
  },
  // chainWebpack: config => {
  //   // config.optimization.delete('splitChunks'),
  //   // disabling prefetch will prevent the browser from loading the other parts of the ap
  //   // while on idle state
  //   // config.plugins.delete('prefetch')
  // },
  configureWebpack: {
    devtool: 'source-map',
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
    node: {
      fs: 'empty', // Resolve node module use of fs
    },
    resolve: {
      alias: {
        // CesiumJS module name
        cesium: path.resolve(__dirname, cesiumSource),
      },
    },
    plugins: [
      // Copy Cesium Assets, and Workers to a static directory
      new CopywebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
      new CopywebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets', ignore: ['Images/**', 'Textures/**', 'IAU2006_XYS/**'] }]),
      // Define relative base path in cesium for loading assets
      new webpack.DefinePlugin({ CESIUM_BASE_URL: JSON.stringify('') })
    ],
  },
  // devServer: {
  //   // assetsSubDirectory: "static",
  //   // assetsPublicPath: "/",
  //   proxy: {
  //     "/api": {
  //       target: "https://www.envidat.ch/ui/proxy/ServiceProxyServlet?server=0&serverpath=",
  //       // target: 'http://www.envidat.ch',
  //       changeOrigin: true,
  //       secure: false,
  //       logLevel: "info",
  //       // pathRewrite: function(path, req) {
  //       //   const from = path;
  //       //   // path = encodeURIComponent(path);
  //       //   path = path.replace("?", "&amp;");
  //       //   path = path.replace("'", "%22");
  //       //   console.log("replaced path from " + from + " to: " + path + " with req " + req.url);
  //       //   return path;
  //       // }
  //       error: function(err, req, res) {
  //         console.log("proxy error: " + err);
  //         // res.writeHead(500, {
  //         //   'Content-Type': 'text/plain'
  //         // });

  //         // res.end('Something went wrong. And we are reporting a custom error message.');
  //       }
  //     }
  //   }
  // }
};
