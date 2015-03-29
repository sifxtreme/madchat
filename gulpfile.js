var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var version = 7;

gulp.task('js', function(){
  return gulp.src(["./public/js/jquery.min.js", "./public/js/detectRTC.js", "./public/js/desktop.js", "./public/js/Autolinker.min.js", "./public/js/socket.io.js", "./public/js/variables.js", "./public/js/chat.js", "./public/js/video.js"])
    .pipe(concat('all-desktop-'+version+'.js'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
});

gulp.task('js-mobile', function(){
  return gulp.src(["./public/js/jquery.min.js", "./public/js/detectRTC.js", "./public/js/mobile.js", "./public/js/index.js", "./public/js/Autolinker.min.js", "./public/js/socket.io.js", "./public/js/variables.js", "./public/js/chat.js", "./public/js/video.js"])
    .pipe(concat('all-mobile-'+version+'.js'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
});
