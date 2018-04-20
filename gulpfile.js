var gulp = require('gulp');
var minjs = require('gulp-uglify');
var mincss = require('gulp-clean-css');
var suffix = require('gulp-rename');
var minimg = require('gulp-imagemin');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
      html:['src/index.html'],
      css:['src/css/styles.css'],
      js:['src/js/*'],
      audio:['src/audio/*']
};
 
gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}));
});


gulp.task('htmlt', function() {
	gulp.src(paths.html)
	.pipe(gulp.dest('build'))
});

gulp.task('audio', function () {
  gulp.src('src/audio/*')
  .pipe(gulp.dest('build/audio/'));
});

gulp.task('css', function(){
  gulp.src(paths.css)
  .pipe(reload({stream:true}))
});

gulp.task('js', function(){
  gulp.src(paths.js)
  .pipe(reload({stream:true}))
});


gulp.task('minjs', function () {
  gulp.src('src/js/audioplayer.js')
  .pipe(minjs())
  .pipe(suffix({suffix: '.min'}))
  .pipe(gulp.dest('build/js/'));
});

gulp.task('mincss', function() {
  gulp.src('src/css/styles.css')
  .pipe(mincss())
  .pipe(suffix({suffix: '.min'}))
  .pipe(gulp.dest('build/css/'))
});

gulp.task('minimg', function(){
  gulp.src('src/images/*')
  .pipe(minimg())
  .pipe(gulp.dest('build/images'))
});

gulp.task('transferjquery', function(){
  gulp.src('src/js/jquery-1.7.2.min.js')
  gulp.src('src/js/jquery-ui-1.8.21.custom.min.js')
  .pipe(gulp.dest('build/js'))
});

gulp.task('watcher',function(){
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.audio, ['audio']);
});

gulp.task('build', ['minjs', 'mincss', 'transferjquery', 'minimg', 'htmlt', 'audio']);
gulp.task('dev', ['watcher', 'browserSync']);

gulp.task('browserSync', function(){
  browserSync({
    server: {
      baseDir: "./build"
    },
    port: 8080,
	host: 'localhost',
    open: true,
    notify: false
  });
});


