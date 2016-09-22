/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');

var paths = {
    dist:'dist',
    deploy:'deploy'
};

gulp.task('clean', function() {
    return del.sync([paths.dist + '/**', paths.deploy + '/**']);
});

/*
gulp.task('archive', [], function() {
    
});

gulp.task('default', ['archive'], function() { 
});

gulp.task('build', ['default'], function() {     
});
 */

gulp.task('build', function() {
    
});

gulp.task('default', function() {
    
});