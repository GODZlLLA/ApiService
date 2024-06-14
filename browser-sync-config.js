module.exports = {
  server: {
    baseDir: 'dist',
    directory: true,
  },
  files: [
    'dist/**/*.html',
    'dist/**/*.css',
    'dist/**/*.js',
  ],
  notify: true,
  online: true,
  https: true,
  open: 'external',
  watchTask: true,
};
