"use strict";
const browsersync = require("browser-sync").create();
const gulp = require("gulp");
const sass = require("gulp-sass");
const pug = require('gulp-pug');
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const cssnano = require("gulp-cssnano");
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require("gulp-imagemin");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "app"
    },
    port: 3000
  });
  done();
}


function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function css() {
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest("app/css"))
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('./build/css'))
    .pipe(browsersync.stream());
}

function images() {
  return gulp
    .src("app/img/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest("./build/img"));
}

function js() {
  return gulp.src('app/js/**/*.js')
  .pipe(concat('scripts.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./build/js'))
  .pipe(browsersync.stream());
};


function pugRender() {
    return gulp.src('app/pug/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('app/'))
    .pipe(gulp.dest('./build/'))					
    .pipe(browsersync.stream());
}

 function fonts(){
    return gulp.src('app/fonts/*')
    .pipe(gulp.dest('./build/fonts'))
}

function watchFiles() {
    gulp.watch('app/scss/**/*.scss', css);
    gulp.watch('app/pug/**/*.pug', pugRender);
    gulp.watch('app/js/**/*.js', browserSyncReload);
}

// Tasks
gulp.task("css", css);
gulp.task("pugRender", pugRender);
gulp.task("images", images);
gulp.task("js", js);
gulp.task("fonts", fonts);

// build
gulp.task("build", gulp.series(gulp.parallel(css, images, pugRender, js, fonts)));

// watch
gulp.task("watch", gulp.parallel(watchFiles, browserSync));

