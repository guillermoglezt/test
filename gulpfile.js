"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var sassLint = require("gulp-sass-lint");
var browserSync = require("browser-sync").create();

// gulp.task('sass', function () {
//     return gulp.src('./sass/master.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('./css'));
// });

// gulp.task('watch', function () {
//     gulp.watch('./sass/**/*.scss', ['sass']);
// });

gulp.task("lint", function() {
  return gulp
    .src("./sass/**/*.scss")
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task("browser-sync", function() {
  browserSync.init({
    proxy: "maniak-site.dev"
  });
});

gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("./sass/**/*.scss", ["sass"]);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./js/*.js").on("change", browserSync.reload);
});

gulp.task("sass", function() {
  return gulp
    .src("./sass/master.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task("default", ["serve"]);
