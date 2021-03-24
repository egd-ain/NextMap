'use strict';
const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const bs = require('browser-sync').create();
const htmlInjector = require('bs-html-injector');
const minify = require("gulp-minify");

function style(){
    return src('./assets/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./assets/css'))
        .pipe(bs.stream());
}

function minifystyle () {
    return src('./assets/scss/app.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./assets/css'))
        .pipe(bs.stream());
}
function minifyjs() {
    return src('./assets/js/app.js', { allowEmpty: true })
        .pipe(minify({noSource: true}))
        .pipe(dest('./assets/js'))
}


function minifyjs() {
    return src('./assets/js/app.js', { allowEmpty: true })
        .pipe(minify({noSource: true}))
        .pipe(dest('./assets/js'))
        .pipe(bs.stream());
}

function serve () {
    bs.use(htmlInjector, {
        files: "**/*.html"
    });
    bs.init({
        injectChanges: true,
        server: true
    });

    watch('**/*.html').on('change', htmlInjector);
    watch('./assets/js/app.js', series(minifyjs));
    watch('./assets/scss/*.scss', series(style, minifystyle));
    watch('./assets/js/app.js', series(minifyjs));
}

exports.style = style;
exports.minifystyle = minifystyle;
exports.minifyjs = minifyjs;
exports.serve = serve;
exports.default = series(exports.style,exports.minifystyle,exports.minifyjs);