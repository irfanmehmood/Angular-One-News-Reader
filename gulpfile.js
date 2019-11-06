var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpNgConfig = require('gulp-ng-config');

//This is a gup task style
gulp.task('styles', function() {
    gulp.src('assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/css'));
});

//This is Setup E-NV config task
gulp.task('setup-local', function () {
    gulp.src('env/config.json')
        .pipe(gulpNgConfig('Setup.config', {environment: 'local'
        }))
        .pipe(gulp.dest('app'))
});

//This is Setup E-NV config task
gulp.task('setup-live', function () {
    gulp.src('env/config.json')
        .pipe(gulpNgConfig('Setup.config', {environment: 'live'}))
        .pipe(gulp.dest('app'))
});

//Add a watch task, to watch for these files
gulp.task('default',function() {
    gulp.watch('assets/sass/**/*.scss',['styles']);
});