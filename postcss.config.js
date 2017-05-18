module.exports = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer')({
      browsers: ['last 3 versions', 'iOS >= 8', 'Safari >= 8'],
    }),
  ],
};
