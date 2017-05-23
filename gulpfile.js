'use strict'

const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');

const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

//install eslint

const esSource = 'src/scripts/**/*.js'; 
const sassSource = 'src/stylesheets/**/*.scss'; 
const pugSource = 'src/views/*.pug';
const imgSource = 'src/images/*'
const miscMediaSource = 'src/media/*'

const jsDist = 'dist/scripts'; 
const cssDist = 'dist/stylesheets'; 
const htmlDist = 'dist/views'; 
const imgDist = 'dist/images'
const miscMediaDist = 'dist/media'


gulp.task('babel', () => {
    return gulp.src(esSource)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .on('error', swallowError)
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(jsDist));
});

gulp.task('sass', () => {
    return gulp.src(sassSource)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(cssDist));
});

gulp.task('pug', () => {
    return gulp.src(pugSource)
    .pipe(pug({
        // pug options here:
    }))
    .on('error', swallowError)
    .pipe(gulp.dest(htmlDist));
});

gulp.task('images', () =>
    gulp.src(imgSource)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDist))
        .on('error', swallowError)
);

gulp.task('media', () => {
    gulp.src(miscMediaSource)
        .pipe(gulp.dest(miscMediaDist))
})

gulp.task('default', () => {
    gulp.start(['babel', 'sass', 'pug', 'images', 'media']);
});

gulp.task('watch', () => {
    gulp.watch(esSource, ['babel']);
    gulp.watch(sassSource, ['sass']);
    gulp.watch(pugSource, ['pug']);
    gulp.watch(imgSource, ['images']);
    gulp.watch(miscMediaSource, ['media']);
});

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}