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
    .pipe(browserSync.stream());
}

// Сборка и объединение CSS
function css() {
  return gulp.src([
    'src/variables.css',          // Переменные
    'src/fonts/**/*.css',         // Шрифты
    'src/globals.css',            // Глобальные стили и сбросы
    'src/typography/**/*.css',    // Типографика
    'src/utilities/**/*.css',     // Утилиты
    'src/blocks/**/*.css',        // Блоки
    'src/themes/dark.css',        // Темная тема
    'src/themes/light.css'        // Светлая тема
  ])
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
}

// Копирование файлов шрифтов
function fonts() {
  return gulp.src('src/fonts/**/*.{woff,woff2,ttf,otf}')
    .pipe(gulp.dest('dist/fonts'));
}

// Копирование изображений
function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
    .pipe(gulp.dest('dist/images'));
}

// Копирование JS
function js() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.stream());
}

// Очистка dist
function clean() {
  return del('dist');
}

// Вотчеры
function watchFiles() {
  gulp.watch('src/**/*.html', html);
  gulp.watch([
    'src/variables.css',
    'src/fonts/**/*.css',
    'src/globals.css',
    'src/typography/**/*.css',
    'src/utilities/**/*.css',
    'src/blocks/**/*.css',
    'src/themes/**/*.css'
  ], css);
  gulp.watch('src/fonts/**/*.{woff,woff2,ttf,otf}', fonts).on('change', browserSync.reload);
  gulp.watch('src/scripts/**/*.js', js);
  gulp.watch('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}', images).on('change', browserSync.reload);
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
