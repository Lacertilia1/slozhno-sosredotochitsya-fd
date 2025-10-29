const gulp = require('gulp');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

// Локальный сервер
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

// Копирование HTML
function html() {
  return gulp.src('src/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

// Сборка и объединение CSS
function css() {
  return gulp.src([
    'src/variables.css',
    'src/fonts/**/*.css',
    'src/themes/**/*.css',
    'src/typography/**/*.css',
    'src/utilities/**/*.css',
    'src/globals.css',
    'src/blocks/**/*.css'
  ])
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

// Копирование файлов шрифтов
function fonts() {
  return gulp.src('src/fonts/**/*.{woff,woff2,ttf,otf}')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({ stream: true }));
}

// Копирование изображений
function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({ stream: true }));
}

// Копирование JS
function js() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({ stream: true }));
}

// Очистка dist
function clean() {
  return del('dist');
}

// Вотчеры
function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch([
    'src/variables.css',
    'src/fonts/**/*.css',
    'src/themes/**/*.css',
    'src/typography/**/*.css',
    'src/utilities/**/*.css',
    'src/globals.css',
    'src/blocks/**/*.css'
  ], css);
  gulp.watch(['src/fonts/**/*.{woff,woff2,ttf,otf}'], fonts);
  gulp.watch(['src/scripts/**/*.js'], js);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}

// Сборка и запуск
const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
const watchapp = gulp.parallel(build, watchFiles, serve);

// Экспорты
exports.html = html;
exports.css = css;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;
