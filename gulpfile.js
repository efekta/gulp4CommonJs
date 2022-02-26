const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

// Конфигурация
const path = require('./config/path');
const app = require('./config/app');

// Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    });
}

// Задачи
const clear = require('./task/clear.js');
const pug = require('./task/pug.js');
const scss = require('./task/scss.js');
const js = require('./task/scripts.js');
const img = require('./task/img.js');
const font = require('./task/font.js');

// Наблюдение
const watcher = () => {
    watch(path.pug.watch, pug).on('all', browserSync.reload);
    watch(path.scss.watch, scss).on('all', browserSync.reload);
    watch(path.js.watch, js).on('all', browserSync.reload);
    watch(path.img.watch, img).on('all', browserSync.reload);
    watch(path.font.watch, font).on('all', browserSync.reload);
}
// Экспорт для отдельного вызова
exports.clear = clear;
exports.pug = pug;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;

//Прод
const build = series(
    clear,
    parallel(pug, scss, js, img, font)
);

//Dev
const dev = series(
    build,
    parallel(watcher, server)
);

// Сборка
// exports.dev = dev;
// exports.build = build;

exports.default = app.isProd
    ? build
    : dev;