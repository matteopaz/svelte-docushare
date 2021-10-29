module.exports = {
    plugins: [
        require('postcss-nested'),
        require('postcss-preset-env'), // Stage 2 by default
        require('postcss-simple-vars'),
        require('postcss-calc'),
        require('autoprefixer')
    ]
}