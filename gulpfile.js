'use strict'; //启用严格模式

var gulp = require('gulp');
var less = require('gulp-less'); //less转css
var webserver = require('gulp-webserver'); //创建本地服务器环境
var rev = require('gulp-rev-append'); //自动版本号生成
var rename = require("gulp-rename"); //重命名文件
var concat = require('gulp-concat');//js文件合并
var uglify = require('gulp-uglify');//js文件压缩

//less转css
gulp.task('style', function() {
	gulp.src('demo1/*.less')
		.pipe(less())
		.pipe(gulp.dest('demo2'));
});

gulp.task('auto_less', function() {
	gulp.watch('demo1/*.less', ['style']);
});

//启动本地web服务，公司
gulp.task('server1', function() {
	gulp.src('./')
		.pipe(webserver({
			port: 8383, //端口
			host: '192.168.0.197', //域名
			liveload: true, //实时刷新代码。不用f5刷新
			directoryListing: {
				path: './',
				enable: true
			}
		}));
});
//启动本地web服务，寝室
gulp.task('server2', function() {
	gulp.src('./')
		.pipe(webserver({
			port: 8383, //端口
			host: '', //域名
			liveload: true, //实时刷新代码。不用f5刷新
			directoryListing: {
				path: './',
				enable: true
			}
		}));
});

//自动添加版本号
gulp.task('rev', function() {
	gulp.src('./**/*.html')
		.pipe(rev())
		.pipe(gulp.dest('./'));
});

//文件重命名相关
gulp.task('one', function() {
	gulp.src('./bizhi/007.jpg')
		.pipe(rename(function(path) {
			console.log(path);
			console.log(path.basename);
			console.log(path.extname);
			path.basename = 'new_008';
			path.extname = ".txt";
		}))
		.pipe(gulp.dest('./bizhi2'));
});

gulp.task('two', function() {
	gulp.src('./bizhi/*.jpg', function(e, w) {
		console.log("cssoModule ERROR: " + e);
		console.log(w instanceof Array); //判断w是否是一个数组对象，返回true或false
		w.forEach(function(item, i) {
			var destUrl = item.slice(item.lastIndexOf('/') + 1);
			console.log(destUrl);

			gulp.src(item)
				.pipe(rename(function(path) {
					path.basename = 'newjpg_' + i;
				}))
				.pipe(gulp.dest('./bizhi2'));
		});
	});
});

var gulp = require('gulp');
var rename = require("gulp-rename");

gulp.task('three', function() {
	gulp.src('./bizhi/*.jpg', function(e, w) {
		console.log("ERROR: " + e);
		console.log(w instanceof Array); //判断w是否是一个数组对象，返回true或false
		w.forEach(function(item, i) {
			var destUrl = item.slice(item.lastIndexOf('/') + 1);
			console.log(destUrl);

			gulp.src(item)
				.pipe(rename(function(path) {
					path.basename = 'create_' + sel(item) + '_end';
				}))
				.pipe(gulp.dest('./bizhi2'));
		});
	});
});

function sel(str) {
	//截取数字字符
	var _start = str.indexOf('(');
	var _end = str.indexOf(')');
	return str.slice(_start + 1, _end);
}

//js文件合并
var _tempFiles1 = [
	'./js/libs/rem750_1_min.js',
	'./js/libs/jquery.min.js',
	'./js/libs/layer.js',
	'./js/libs/layerTipsX.min.js'
];
gulp.task('concat1', function() {
	gulp.src(_tempFiles1)
	.pipe(concat('2017-11-22-1.js'))
	.pipe(gulp.dest('./js/libs/'));	
});
//js文件压缩
gulp.task('jsmin', function () {
    gulp.src('./js/libs/layerTipsX.js')
        .pipe(uglify('layerTipsX.min.js'))
        .pipe(gulp.dest('./js/libs/'));
});
//var uglifyjs = require('uglify-js'); // can be a git checkout 
//                                   // or another module (such as `uglify-es` for ES6 support) 
//var composer = require('gulp-uglify/composer');
//var pump = require('pump');
// 
//var minify = composer(uglifyjs, console);
// 
//gulp.task('compress', function (cb) {
//// the same options as described above 
//var options = {};
// 
//pump([
//    gulp.src('./js/libs/rem750_1.js'),
//    minify(options),
//    gulp.dest('./js/libs/rem750_1_min.js')
//  ],
//  cb
//);
//});