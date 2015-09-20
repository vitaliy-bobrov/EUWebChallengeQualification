'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  del = require('del'),
  selectorMatches = require('postcss-selector-matches'),
  willChange = require('postcss-will-change'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require("css-mqpacker"),
  mqkeyframes = require('postcss-mq-keyframes'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

var config = {
  images: {
   src: {
    all: './src/images/**/*.{png,jpg,jpeg,svg}',
    webp: './src/images/**/*.{png,jpg,jpeg}',
   },
   dest: './dist/images/',
  },
  scripts: {
   src: './src/js/**/*.js',
   dest: './dist/js/',
  },
  styles: {
   src: './src/sass/**/*.{scss,sass}',
   dest: './dist/css/',
  },
  html: {
   src: './src/*.html',
   dest: './dist/',
  },
  libraries: {
    src: ['./src/libraries/**/{picturefill,jquery,owl.carousel}.min.js'],
    dest: './dist/libraries/',
  },
  fonts: {
    src: './src/fonts/*',
    dest: './dist/fonts/'
  },
  misc: {
    src: ['./src/manifest.*', './src/favicon.*'],
    dest: './dist/',
  },
};

var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 36',
  'chrome >= 42',
  'safari >= 6',
  'opera >= 12',
  'ios >= 6',
  'android >= 2.3',
  'bb >= 10',
];

var onError = function (error) {
  console.log(error.toString());
  this.emit('end');
};

gulp.task('clean', del.bind(
  null,
  config.html.dest,
  {
    dot: true,
    force: true,
  }
));

gulp.task('webp', function () {
  return gulp.src(config.images.src.webp)
    .pipe($.webp())
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('images', ['webp'], function() {
  return gulp.src(config.images.src.all)
  .pipe($.imagemin({
    progressive: true,
    interlaced: true,
    svgoPlugins: [
      {removeViewBox: false},
    ],
  }))
  .pipe(gulp.dest(config.images.dest))
  .pipe($.size({title: 'images'}));
});

gulp.task('styles', function() {
  var processors = [
    selectorMatches,
    willChange,
    autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS,
      cascade: false,
    }),
    mqpacker({
      sort: true,
    }),
    mqkeyframes,
  ];

  return gulp.src(config.styles.src)
  .pipe($.plumber({
    errorHandler: onError
  }))
  .pipe($.sourcemaps.init())
  .pipe($.sass({
    includePaths: ['./src/libraries/'],
    outputStyle: 'expanded',
    precision: 10,
  }))
  .pipe($.postcss(processors))
  .pipe($.webpcss())
  .pipe($.concat('main.css'))
  .pipe($.cssnano({
    convertValues: false,
    autoprefixer: false,
  }))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(config.styles.dest))
  .pipe($.size({title: 'styles'}))
  .pipe(reload({stream: true}));
});

gulp.task('libraries', function() {
  return gulp.src(config.libraries.src)
  .pipe($.copy(config.libraries.dest, {prefix: 4}))
  .pipe($.size({title: 'libraries'}));
});

gulp.task('fonts', function() {
  return gulp.src(config.fonts.src)
  .pipe(gulp.dest(config.fonts.dest))
  .pipe($.size({title: 'fonts'}));
});

gulp.task('scripts', function() {
  return gulp.src(config.scripts.src)
  .pipe($.plumber({
    errorHandler: onError
  }))
  .pipe($.sourcemaps.init())
  .pipe($.jshint())
  .pipe($.jshint.reporter('jshint-stylish'))
  .pipe($.concat('main.js'))
  .pipe($.uglify({preserveComments: 'some'}))
  .pipe($.rename({
    suffix: '.min',
    extname: '.js',
  }))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(config.scripts.dest))
  .pipe($.size({title: 'scripts'}))
  .pipe(reload({stream: true}));
});

gulp.task('misc', function() {
  return gulp.src(config.misc.src)
  .pipe(gulp.dest(config.misc.dest));
});

gulp.task('html', function() {
  return gulp.src(config.html.src)
  .pipe($.plumber({
    errorHandler: onError
  }))
  .pipe($.htmlhint('.htmlhintrc'))
  .pipe($.htmlhint.reporter('htmlhint-stylish'))
  .pipe($.htmltidy({
    doctype: 'html5',
    hideComments: true,
  }))
  .pipe($.minifyHtml())
  .pipe(gulp.dest(config.html.dest))
  .pipe($.size({title: 'html'}))
  .pipe(reload({stream: true}));
});

gulp.task('build', ['clean'], function() {
  gulp.start('images', 'styles', 'libraries', 'fonts', 'scripts', 'misc', 'html');
});

gulp.task('serve', ['build'], function() {
  browserSync({
    notify: {
      timeout: 2000,
    },
    logPrefix: 'BrowserSync',
    server: {
      baseDir: "./dist/",
    },
    port: 3333,
    ui: {
      port: 3331,
    },
  });
});

gulp.task('watch', function() {
  gulp.watch(config.scripts.src, ['scripts']);
  gulp.watch(config.styles.src, ['styles']);
  gulp.watch(config.images.src.all, ['images']);
  gulp.watch(config.html.src, ['html']);
});

gulp.task('default', ['serve'], function() {
  gulp.start('watch');
});