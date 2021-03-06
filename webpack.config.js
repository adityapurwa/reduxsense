const path = require('path');

module.exports = {
    devtool: "source-map",
    entry: {
        'app.js': path.resolve('src/app.js')
    },
    output: {
        path: path.resolve('dist'),
        filename: "[name]"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    }
};