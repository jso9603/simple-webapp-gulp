/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var del = require('del');

var imageminpngquant = require('imagemin-pngquant');
var mainbowerfiles = require('main-bower-files');
var mergestream = require('merge-stream');

var gulp = require('gulp');
//var gulpconcat = require('gulp-concat');
var gulpsass = require('gulp-sass');
var gulpcleancss = require('gulp-clean-css');
var gulpdebug = require('gulp-debug');
var gulphtmlmin = require('gulp-htmlmin');
var gulpimagemin = require('gulp-imagemin');


var src_exclude = ['!src/bower_components{,/**}'];

var paths = {
    src: 'src',
    src_markups: ['src/**/*.html'].concat(src_exclude),
    src_css: ['src/styles/**/*.css'].concat(src_exclude),
    src_sass: ['src/styles/**/*.scss'].concat(src_exclude),
    dist: 'dist',
    dist_styles: 'dist/styles',
    dist_markups: 'dist',
    deploy: 'deploy',
    src_images: ['src/images/**/*.png', 'src/images/**/*.jpg', 'src/images/**/*.svg'].concat(src_exclude),
    dist_images: 'dist/images'
};

gulp.task('clean', function () {
    return del.sync([paths.dist + '/**', paths.deploy + '/**']);
});

// copies bower main files while preseving directory structures
gulp.task("mainbowerfiles", function () {
    return gulp.src(mainbowerfiles(), {base: paths.src + '/bower_components'})
            .pipe(gulpdebug({title: 'mainbowerfiles'}))
            .pipe(gulp.dest(paths.dist + '/bower_components'));
});

gulp.task('styles', function () {
    return mergestream(
            (gulp.src(paths.src_css)),
            (gulp.src(paths.src_sass).pipe(gulpsass().on('error', gulpsass.logError))))
            .pipe(gulpcleancss({debug: true}, function (details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + ': ' + details.stats.minifiedSize);
            }))
            .pipe(gulpdebug({title: 'styles'}))
            .pipe(gulp.dest(paths.dist_styles));
});

gulp.task('markups', ['mainbowerfiles'], function () {
    return gulp.src(paths.src_markups)
            .pipe(gulphtmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(paths.dist_markups));
});

gulp.task('images', function () {
    return gulp.src(paths.src_images)
            .pipe(gulpdebug({title: 'images'}))
            .pipe(gulpimagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [imageminpngquant()]
            }))
            .pipe(gulp.dest(paths.dist_images));
});

/*
 gulp.task('archive', [], function() {
 
 });
 
 gulp.task('default', ['archive'], function() { 
 });
 
 gulp.task('build', ['default'], function() {     
 });
 */

gulp.task('build', ['styles', 'markups', 'images'], function () {

});

gulp.task('default', function () {

});