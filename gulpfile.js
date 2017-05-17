const gulp = require('gulp');
const sass = require('gulp-sass');
const browser = require('gulp-browser');
const imagemin = require('gulp-imagemin');
const strip = require('gulp-strip-comments');

gulp.task('default', ['html', 'css', 'js', 'images', 'fonts']);

gulp.task('html', () => {
  return gulp.src('index.html')
  .pipe(strip())
  .pipe(gulp.dest('public_html/'))
});

gulp.task('css', () => {
  return gulp.src('style.scss')
  .pipe(sass())
  .pipe(strip.text())
  .pipe(gulp.dest('public_html/css'))
});

gulp.task('css', () => {
  return gulp.src('css/*')
  .pipe(strip.text())
  .pipe(gulp.dest('public_html/css'))
});

gulp.task('js', () => {
  return gulp.src('js/*')
  .pipe(browser.browserify())
  .pipe(strip())
  .pipe(gulp.dest('public_html/js'))
});

gulp.task('images', () => {
  return gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('public_html/images/'))
});

gulp.task('fonts', () => {
  return gulp.src('fonts/*')
  .pipe(gulp.dest('public_html/fonts'))
});

gulp.task('watch', ['default'], () => {
  gulp.watch('*.html', ['html']);
  gulp.watch('*.scss', ['css']);
  gulp.watch('*.js', ['js']);
  gulp.watch('js/*', ['js'])
  gulp.watch('images/*', ['images']);
  gulp.watch('fonts/*', ['fonts'])
});
