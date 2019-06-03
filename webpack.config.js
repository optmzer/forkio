const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    }
    // , mode: "development" // Uncomment or move to script in package.json
    // , mode: "production"
}

// Dev and production mode are set in npm script package.json