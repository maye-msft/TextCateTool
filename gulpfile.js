

const { src, dest, parallel } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserify = require('gulp-browserify')
const babelify = require('babelify')

function html() {
    return src('./static/index.html')
        .pipe(dest('dest/static/'));
  }

function server() {
    return src(['./startservercluster.js',
        './startserver.js',
        './server.js'])
        .pipe(dest('dest/'));
}

function js() {
    return src([
        "node_modules/vue/dist/**/*.*",
        "node_modules/vuetify/dist/**/*.*",
        "node_modules/chart.js/dist/**/*.*",
        "node_modules/vue-chartjs/dist/**/*.*",
        "node_modules/vue-chartkick/dist/**/*.*",
        "node_modules/vuex/dist/**/*.*",
        "node_modules/vue-router/dist/**/*.*",
        "node_modules/file-saver/dist/**/*.*",
        "node_modules/jquery/dist/**/*.*",
        "node_modules/node-nlp/dist/bundle.js",
        "node_modules/vue-d3-network/dist/**/*.*",
        "node_modules/echarts/dist/**/*.*",
        "node_modules/echarts-wordcloud/dist/**/*.*",
        "node_modules/vue-resize-directive/dist/**/*.*",
        "node_modules/csv-js/**/*.*"
    ], {base: "."})
    .pipe(dest('dest/'));
}

function script() {
    return src('./static/js/main.js')
    .pipe(browserify({
        transform: [babelify.configure({
            presets: ['@babel/env']
        })]
    }))
      .pipe(babel())
    //   .pipe(src('vendor/*.js'))
    //   .pipe(dest('output/'))
      .pipe(uglify())
      .pipe(rename({ extname: '.js' }))
      .pipe(dest('dest/static/js/'));
  }


exports.default = parallel(html, script, js, server)
