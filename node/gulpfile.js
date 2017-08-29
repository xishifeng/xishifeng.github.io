'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var webserver = require('gulp-webserver');


gulp.task('copy', function() {
  gulp.src('demo1/demo1.html').pipe(gulp.dest('demo2'));//gulp.src获得对应路径的文件,.pipe之后只执行dest任务，复制此文件到demo2/路径下..pipe的数量代表了操作的数量
});

gulp.task('update', function(){
	gulp.watch('demo1/demo1.html',['copy']);//'copy'是前面定义的gulp任务（函数）,当demo1/demo1.html文件发生变化时，执行copy任务
});



gulp.task('style', function(){
	gulp.src('demo1/*.less')
	.pipe(less())
	.pipe(gulp.dest('demo2'));
});

gulp.task('auto_less', function(){
	gulp.watch('demo1/*.less',['style']);
});
 
gulp.task('webserver',function(){
	gulp.src('demo1/*.*')
	.pipe(webserver({
	  livereload: true,
	  directoryListing: true,
	  open: true
	}));
});

gulp.task('f5', function(){
	gulp.watch('demo1/*.*', ['webserver']);
});





