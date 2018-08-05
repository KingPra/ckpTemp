const gulp = require('gulp');
const sass = require('gulp-sass');
const browser = require('gulp-browser');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minifier');
const rename = require('gulp-rename');

gulp.task('default', ['html', 'css', 'js', 'images', 'fonts', 'browserSync']);

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'public_html'
    }
  });
});

gulp.task('html', () => {
  return gulp.src('development/*.html')
  .pipe(minify({
    minify: true,
    minifyHTML: {
      collapseWhitespace: true
    }
  }))
  .pipe(gulp.dest('public_html/'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

// gulp.task('css', () => {
//   return gulp.src('css/*')
//   .pipe(minify({
//     minify: true,
//     minifyCSS: true
//   }))
//   .pipe(gulp.dest('public_html/css'))
//   .pipe(browserSync.reload({
//     stream: true
//   }));
// });

gulp.task('css', () => {
  return gulp.src('development/css/bootstrap.css')
  .pipe(minify({
    minify: true,
    minifyCSS: true
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('public_html/css/'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('js', () => {
  return gulp.src('development/js/*')
  .pipe(browser.browserify())
  .pipe(minify({
    minify: true,
    minifyJS: true
  }))
  .pipe(gulp.dest('public_html/js'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('images', () => {
  return gulp.src('development/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('public_html/images/'))
});

gulp.task('fonts', () => {
  return gulp.src('development/fonts/*')
  .pipe(gulp.dest('public_html/fonts'))
});

gulp.task('watch', ['default'], () => {
  gulp.watch('development/*.html', ['html']);
  gulp.watch('development/css/*.css', ['css']);
  gulp.watch('development/*.js', ['js']);
  gulp.watch('development/js/*', ['js'])
  gulp.watch('development/images/*', ['images']);
  gulp.watch('development/fonts/*', ['fonts'])
});
