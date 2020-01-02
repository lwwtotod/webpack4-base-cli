// 引入 gulp
var gulp = require('./node_modules/gulp')

// 引入组件
var jshint = require('./node_modules/gulp-jshint/src')
var sass = require('./node_modules/gulp-sass') //编译sass
var concat = require('./node_modules/gulp-concat') //合并jscss
var uglify = require('./node_modules/gulp-uglify') //压缩jscss
var rename = require('./node_modules/gulp-rename') //重命名
var cssnano = require('./node_modules/gulp-cssnano') //CSS压缩
var autoprefixer = require('./node_modules/gulp-autoprefixer') //后编译，自动添加css兼容前缀
var clean = require('./node_modules/gulp-clean') //清除dist
var babel = require('./node_modules/gulp-babel') //es6转es5
var imagemin = require('./node_modules/gulp-imagemin') //压缩img
var SRC = './'
var DEST = './dist/'
// 清除目标文件夹
gulp.task('clean', function() {
  return gulp.src(['dist/css','dist/js']).pipe(clean())
})
// 检查脚本
gulp.task('lint', function() {
  gulp
    .src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
})
// gulp.src('./scss/*.scss')
// .pipe(sass())
// .pipe(gulp.dest('./css'))
// 编译Sass
gulp.task('scss', function() {
  return gulp
    .src('./scss/*.scss')
    .pipe(sass()) //读取待src/css 目录下所有的css文件
    // .pipe(concat('app.min.css')) //合并CSS，同时重命名为merge.min.css
    .pipe(cssnano()) //压缩 CSS
    .pipe(
      autoprefixer({
        //自动给CSS 加前缀，用于兼容不同浏览器，不同版本
        browsers: ['last 10 versions'], //具体参数含义，你应该去npm看文档
        cascade: false
      })
    )
    .pipe(gulp.dest('dist/css')) //最后输出到 dist/css 目录下
})
//压缩合并css
gulp.task('css', function() {
  return gulp
    .src('./css/*.css') //读取待src/css 目录下所有的css文件
    .pipe(concat('app.min.css')) //合并CSS，同时重命名为merge.min.css
    .pipe(cssnano()) //压缩 CSS
    .pipe(
      autoprefixer({
        //自动给CSS 加前缀，用于兼容不同浏览器，不同版本
        browsers: ['last 10 versions'], //具体参数含义，你应该去npm看文档
        cascade: false
      })
    )
    .pipe(gulp.dest('dist/css')) //最后输出到 dist/css 目录下
})

gulp.task('mincss', function() {
  return gulp
    .src('./css/*.css') //读取待src/css 目录下所有的css文件
    // .pipe(concat('app.min.css')) //合并CSS，同时重命名为merge.min.css
    .pipe(cssnano()) //压缩 CSS
    .pipe(
      autoprefixer({
        //自动给CSS 加前缀，用于兼容不同浏览器，不同版本
        browsers: ['last 10 versions'], //具体参数含义，你应该去npm看文档
        cascade: false
      })
    )
    .pipe(gulp.dest('dist/css')) //最后输出到 dist/css 目录下
})

// 压缩合并js
gulp.task('scripts', function() {
  // gulp
  //   .src(SRC + 'js/lib/*.js')
  //   .pipe(concat('vendor.js'))
  //   .pipe(uglify())
  //   .pipe(gulp.dest(DEST + 'js'))

  gulp
    .src(SRC + 'js/*.js')
    .pipe(
      babel({
        presets: ['env']
      })
    )
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(DEST + 'js'))
})

// 压缩图片
gulp.task('img', function() {
  gulp
    .src(SRC + 'img/*')
    .pipe(
      imagemin({
        progressive: true
      })
    )
    .pipe(gulp.dest(DEST + '/img'))
})
// 开发的时候在命令行启动
// $ gulp watch
gulp.task('watch', function() {
  gulp.watch(SRC + 'js/lib/*', ['scripts'])
  gulp.watch(SRC + 'js/*', ['scripts'])
  gulp.watch(SRC + 'css/*.css', ['css'])
  gulp.watch(SRC + 'img/*', ['img'])
})

// 清除与打包异步执行
gulp.task('build', ['scss', 'scripts'], function() {
  console.log('gulp编译完成')
})

// gulp 入口
gulp.task('default', ['clean'], function() {
  return gulp.start('build')
})
