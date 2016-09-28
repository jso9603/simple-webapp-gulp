
var del = require('del');

var imageminpngquant = require('imagemin-pngquant');

var mainbowerfiles = require('main-bower-files');
var mergestream = require('merge-stream');

var gulp = require('gulp');
//var gulpconcat = require('gulp-concat');
var gulpjshint = require('gulp-jshint');
var gulprename = require('gulp-rename');
var gulpsass = require('gulp-sass');
var gulpcleancss = require('gulp-clean-css');
var gulpdebug = require('gulp-debug');
var gulphtmlhint = require("gulp-htmlhint");
var gulphtmlmin = require('gulp-htmlmin');
var gulpimagemin = require('gulp-imagemin');
var gulpuglify = require('gulp-uglify');
var gulputil = require('gulp-util');

//var src_exclude = ['!src/bower_components{,/**}'];

var paths = {
    src: 'src',
    src_markups: ['src/**/*.html'],
    src_css: ['src/styles/**/*.css'],
    src_sass: ['src/styles/**/*.scss'],
    src_scripts: ['src/scripts/**/*.js'],
    dist: 'dist',
    dist_config: 'dist/config',
    dist_styles: 'dist/styles',
    dist_markups: 'dist',
    dist_scripts: 'dist/scripts',
    deploy: 'deploy',
//    src_images: ['src/images/**/*.png', 'src/images/**/*.jpg', 'src/images/**/*.svg'].concat(src_exclude),
    src_images: ['src/images/**/*.png', 'src/images/**/*.jpg'],
    dist_images: 'dist/images'
};

gulputil.log("NODE_ENV: " + process.env.NODE_ENV);
var environment = process.env.NODE_ENV || (gulputil.env.environment || 'production');
gulputil.log('environment: ' + environment);
process.env.NODE_ENV = environment;

gulp.task('clean', function () {
    return del.sync([paths.dist + '/**', paths.deploy + '/**']);
});

// copies bower main files while preseving directory structures
gulp.task("mainbowerfiles", function () {
    return gulp.src(mainbowerfiles(), {base: 'bower_components'})
            .pipe(gulpdebug({title: 'mainbowerfiles'}))
            .pipe(gulp.dest(paths.dist + '/bower_components'));
});

gulp.task('config-default', function () {
    return gulp.src([paths.src + '/config/default-' + environment + '.json'])
            .pipe(gulpdebug({title: 'config-default'}))
            .pipe(gulprename('default.json'))
            .pipe(gulp.dest(paths.dist_config));
});

gulp.task('scripts', ['config-default'], function () {
    return gulp.src(paths.src_scripts)
            .pipe(gulpjshint())
            .pipe(gulpuglify())
            .pipe(gulp.dest(paths.dist_scripts));
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

gulp.task('images', function () {
    return gulp.src(paths.src_images)
            .pipe(gulpdebug({title: 'images'}))
            .pipe(gulpimagemin({
                progressive: true,
//                svgoPlugins: [{removeViewBox: false}],
                use: [imageminpngquant()]
            }))
            .pipe(gulp.dest(paths.dist_images));
});

gulp.task('markups', ['mainbowerfiles', 'scripts', 'images', 'styles'], function () {
    return gulp.src(paths.src_markups)
            .pipe(gulphtmlhint())
            .pipe(gulphtmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(paths.dist_markups));
});



/*
 gulp.task('archive', [], function() {
 
 });
 
 gulp.task('default', ['archive'], function() { 
 });
 */

gulp.task('build', ['markups'], function () {
});

gulp.task('default', ['build'], function () {
});