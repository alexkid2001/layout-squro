const gulp        = require('gulp'),
      watch       = require('gulp-watch'),
      preFixer    = require('gulp-autoprefixer'),
      sass        = require('gulp-sass'),
      sourceMaps  = require('gulp-sourcemaps'),
      cssMin      = require('gulp-minify-css'),
      clean       = require('gulp-clean'),
      pug         = require('gulp-pug'),
      browserSync = require('browser-sync'),
      fs          = require('fs'),
      reload      = browserSync.reload,
      plumber = require('gulp-plumber'),

      path = {
        build: {
          html: 'build/',
          css: 'build/styles'
        },
        src: {
          base: 'assets/',
          pug: 'assets/pug/**/*.pug',
          style: 'assets/sass/common.scss'
        },
        watch: {
          pug: './assets/pug/**/*.pug',
          style:'./assets/sass/**/*.scss',
        },
        clean: './build'
      };

gulp.task('webServer', () => {
  browserSync({
    server: {
      baseDir: './build'
    },
    host: 'localhost',
    port: '9000',
    tunnel: false,
    logPrefix: 'Frontend_Devil'
  })
});

gulp.task('pug:build', () => gulp.src(path.src.pug).
  pipe(pug({
    pretty: true
  })).
  pipe(gulp.dest(path.build.html)).
  pipe(reload({stream: true})))

gulp.task('style:build', () => gulp.src(path.src.style).
  pipe(sourceMaps.init()).
  pipe(sass()).
  pipe(preFixer()).
  pipe(cssMin()).
  pipe(sourceMaps.write()).
  pipe(gulp.dest(path.build.css)));

gulp.task('clean', () => gulp.src(path.clean).
  pipe(clean()));

//-------------------------------------------------Synchronization
gulp.task('imageSync', function () {
  return gulp.src(path.src.base + 'i/**/*')
    .pipe(plumber())
    .pipe(gulp.dest(path.build.html + 'i/'))
    .pipe(browserSync.stream({once: true}));
});

gulp.task('fontsSync', function () {
  return gulp.src(path.src.base + 'fonts/**/*')
    .pipe(plumber())
    .pipe(gulp.dest(path.build.html + 'fonts/'))
    .pipe(browserSync.stream({once: true}));
});

gulp.task('jsSync', function () {
  return gulp.src(path.src.base + 'js/*.js')
    .pipe(plumber())
    .pipe(gulp.dest(path.build.html + 'js/'))
    .pipe(browserSync.stream({once: true}));
});
//-------------------------------------------------Synchronization###



var svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace');

gulp.task('svgSpriteBuild', function () {
  return gulp.src(assetsDir + 'i/icons/*.svg')
  // minify svg
  .pipe(svgmin({
    js2svg: {
      pretty: true
    }
  }))
  // remove all fill and style declarations in out shapes
  .pipe(cheerio({
    run: function ($) {
      $('[fill]').removeAttr('fill');
      $('[stroke]').removeAttr('stroke');
      $('[style]').removeAttr('style');
    },
    parserOptions: {xmlMode: true}
  }))
  // cheerio plugin create unnecessary string '&gt;', so replace it.
  .pipe(replace('&gt;', '>'))
  // build svg sprite
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: "../sprite.svg",
        render: {
          scss: {
            dest:'../../../sass/_sprite.scss',
            template: assetsDir + "sass/templates/_sprite_template.scss"
          }
        },
        example: true
      }
    }
  }))
  .pipe(gulp.dest(assetsDir + 'i/sprite/'));
});

gulp.task('cssLint', function () {
  return gulp.src([assetsDir + 'sass/**/*.scss', '!' + assetsDir + 'sass/templates/*.scss'])
    .pipe(postcss(
      [
        stylelint(),
        reporter({ clearMessages: true })
      ],
      {
        syntax: postcss_scss
      }
    ));
});





gulp.task('default', gulp.series(gulp.series(
  gulp.parallel(
    'pug:build',
    'style:build',
    'imageSync', 
    'fontsSync', 
    'jsSync'
  ),
  'webServer'
)));

gulp.watch(path.watch.pug, {usePolling: true}, gulp.parallel('pug:build', 'imageSync', 'fontsSync', 'jsSync')).on('change', browserSync.reload);
gulp.watch(path.watch.style, {usePolling: true}, gulp.series('style:build', 'pug:build'));
