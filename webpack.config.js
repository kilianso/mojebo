var webpack = require('webpack');

var config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './_webpack/js/entry.js',
  },
  output: {
    path: __dirname + '/src/assets/js', // `dist` is the destination
    filename: 'main.js',
		publicPath: "/assets",
  },
	module: {
    rules: [
      {
        test: /\.js$/, //Check for all js files
        loader: 'babel-loader',
        query: {
          presets: [ "babel-preset-es2015" ].map(require.resolve)
        }
      },
    ]
  },
};
module.exports = config;
