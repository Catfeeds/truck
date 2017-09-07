var argv = require('yargs').argv,
	config = null;
	if(argv.p == "pro"){
		console.log("read config from pro");
		config = require("./config/config.pro.js");
	}else{
		console.log("read config from test");
		config = require("./config/config.test.js");
	}

var gulp = require("gulp"),
    replace = require('gulp-replace'),
    rev = require("gulp-rev"), //加MD5后缀
    revCollector = require("gulp-rev-collector"), //gulp-rev的插件，用于html模板更改引用路径
    webpack = require("webpack"), //wepack
    webpackConfig = require('./webpack.config.pro.js'), //webpack配置文件
    gulpwebpack = require('gulp-webpack'), //wepack和gulp结合插件
    del = require('del'), //删除文件
    outputPath_css = "seatourpage/styles",
    outputPath_img = "seatourpage/images",
    outputPath_js = "seatourpage/scripts",
    outputPath_lib = "seatourpage/libs",
    putputPath_html = "seatourpage";

//样式
gulp.task("styles", ["images"], function() {
    return gulp.src("build/styles/**/*.css")
        .pipe(rev())
        .pipe(gulp.dest( "dist/" + outputPath_css ) ) //输出文件
        .pipe(rev.manifest("manifest.json"))
        .pipe(gulp.dest( "dist/" + outputPath_css ) ) //输出文件
});

//脚本
gulp.task("scripts", ["webpack"], function() {
    gulp.src("build/chunkes/**/*.js")
        .pipe(gulp.dest( "dist/" + outputPath_js + "/chunkes" ))

    return gulp.src("build/scripts/**/*.js")
        .pipe(rev())
        .pipe(gulp.dest( "dist/" + outputPath_js )) //重新输出文件
        .pipe(rev.manifest("manifest.json"))
        .pipe(gulp.dest( "dist/" + outputPath_js )) //重新输出文件
});

//图片
gulp.task("images", function() {
    return gulp.src("public/images/**/*")
        // .pipe(imgCache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(rev())
        .pipe(gulp.dest( "dist/" + outputPath_img ))
        .pipe(rev.manifest("manifest.json"))
        .pipe(gulp.dest( "dist/" + outputPath_img ))
});

gulp.task("lib-fonts", function() {
    return gulp.src(["public/lib/**/*.eot","public/lib/**/*.svg","public/lib/**/*.ttf", "public/lib/**/*.woff"])
        .pipe(gulp.dest( "dist/seatourpage/libs" ));
});

gulp.task("css-fonts",function(){
    return gulp.src(["public/styles/*.otf"])
        .pipe(gulp.dest( "dist/seatourpage/styles"));
});

//第三方库
gulp.task("lib", ["lib-fonts"], function() {
    return gulp.src(["public/libs/**/*.css","public/libs/**/*.js"])
        .pipe(rev())
        .pipe(gulp.dest( "dist/" + outputPath_lib ))
        .pipe(rev.manifest("manifest.json"))
        .pipe(gulp.dest( "dist/" + outputPath_lib ));
});

//为css替换图片MD5的后缀
gulp.task("replace-css", ["css-fonts"], function() {
    return gulp.src(["dist/" + outputPath_img + "/**/manifest.json", "dist/" + outputPath_css + "/**/*.css"])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                "/public/images/": config.cdn + outputPath_img + "/"
            }
        }))
        .pipe(gulp.dest( "dist/" + outputPath_css ))
});

//为css替换图片MD5的后缀
gulp.task("replace-js", function() {
    return gulp.src(["dist/" + outputPath_img + "/**/manifest.json", "dist/" + outputPath_js + "/**/*.js"])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                "/public/images/": config.cdn + outputPath_img + "/"
            }
        }))
        .pipe(gulp.dest( "dist/" + outputPath_js ))
});

//为html替换js、cssMD5的后缀
gulp.task("replace-html", function() {
    return gulp.src(["dist/**/**/manifest.json", "views/**/*.html", "*.html"])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                //匹配前缀，替换cdn路径
                "/build/scripts/": config.cdn + outputPath_js + "/",
                "/build/styles/": config.cdn + outputPath_css + "/",
                "/public/images/": config.cdn + outputPath_img + "/",
                "/public/libs/" : config.cdn + outputPath_lib + "/",
            }
        }))
        .pipe(replace('/domain_name/', config.cdn))   //替换地址
        .pipe(gulp.dest( "dist/"  + putputPath_html ) )
});

//使用webpack插件
gulp.task("webpack", function(callback) {
    return webpack(Object.create(webpackConfig)).run(function(err, stats) {
        console.info(err)
        callback();
    });
});

//MD5后缀
gulp.task("replace", ["styles", "scripts", "lib"], function() {
    gulp.start("replace-css", "replace-html", "replace-js");
});

// 清理
gulp.task('clean', function() {
    return del(['dist/*', 'build/*'], function() {
        return gulp;
    })
});

// 预设任务
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

//构建项目
gulp.task("build", ["clean"], function() {
    gulp.start("replace");
});