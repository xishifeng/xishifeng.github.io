var  gulp = require('gulp');
//1 创建服务
var webserver = require('gulp-webserver');
//2 依赖sass插件 编译scss文件
// var sass = require('gulp-sass');
////3 图片压缩
//var imagemin = require('gulp-imagemin');
//4 实现js模块化
var named = require('vinyl-named');
//启动服务
gulp.task('webserver',function(){
	gulp.src('./')
	.pipe(webserver({
		livereload:true,       //实时刷新
		directoryListing:{    //要不要在浏览器中显示应用app的目录
			enable:true,      //显示 （线上不能如此设置）
			path:'./'         //显示与gulpfile.js同级别的子目录，也可以改路径指定显示哪些文件
		},
		port:'8383',
		host:'192.168.11.194'
	}))
})

//（复制html文件）   ** 表示找到所有文件的子文件
var htmlFiles = ['dist/html/**/*'];
gulp.task('copy-html',function(){
	return gulp.src(htmlFiles)
	.pipe(gulp.dest('pro/huasiManager/html'));
})

//（复制首页index文件）
var indexFiles = ['dist/index.html'];
gulp.task('copy-index',function(){
	return gulp.src(indexFiles)
	.pipe(gulp.dest('pro/huasiManager'));
})
//（复制login文件）
var loginFiles = ['dist/login.html'];
gulp.task('copy-login',function(){
	return gulp.src(loginFiles)
	.pipe(gulp.dest('pro/huasiManager'));
})

//复制图片
var imageFiles = ['dist/img/**/*'];
gulp.task('copy-img',function(){
	return gulp.src(imageFiles)
	.pipe(gulp.dest('pro/huasiManager/img'))
})

//复制css文件
var cssFiles = ['dist/css/**/*.css'];
gulp.task('copy-css', function() {
    return gulp.src(cssFiles)      //压缩的文件
        .pipe(gulp.dest('pro/huasiManager/css'))   //输出文件夹
//      .pipe(minifycss());   //执行压缩
});
   // 预编译scss文件
//var scssFiles = ['dist/css/**/*.scss'];
//gulp.task('sass',function(){
//	return gulp.src(scssFiles)
//	.pipe(sass().on('error',sass.logError))
//	.pipe(gulp.dest('pro/huasiManager/css'));
//})


//复制  通过webpack 实现 js模块化
var jsFiles = ['dist/js/**/*']
gulp.task('packjs',function(){
	return gulp.src(jsFiles)
	.pipe(gulp.dest('pro/huasiManager/js'));
})


//监听
gulp.task('watch',function(){
	gulp.run('copy-html','copy-index','copy-login','copy-img','copy-css','packjs');
	gulp.watch(htmlFiles,['copy-html']);
	gulp.watch(indexFiles,['copy-index']);
	gulp.watch(loginFiles,['copy-login']);
	gulp.watch(imageFiles,['copy-img']);
	gulp.watch(cssFiles,['copy-css']);
//	gulp.watch(scssFiles,['sass']);
	gulp.watch(jsFiles,['packjs']);
})	

gulp.task('default',['watch','webserver']);
