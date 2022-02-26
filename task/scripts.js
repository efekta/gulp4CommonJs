const { src, dest } = require('gulp');

// Конфигурация
const path = require('../config/path');
const app = require('../config/app');

// Обработка JavaScript
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');

const js = ()  => {
    return src(path.js.src, { sourcemaps: app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'JavaScript',
                message: error.message
            }))
        }))
        .pipe(babel())
        .pipe(webpack(app.webpack))
        // .pipe(uglify())
        .pipe(dest(path.js.dest, { sourcemaps: app.isDev }))
};

module.exports = js;