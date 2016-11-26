const gulp = require('gulp');
const rollup = require('gulp-rollup');
const babel = require('rollup-plugin-babel');
const flow = require('rollup-plugin-flow');

const paths = {
  js: {
    client: {
      src:  './src/js/**/*.js',
      entry: './src/js/client/main.js',
      dest: './dist/',
    },
    server: {
      src:  './src/js/**/*.js',
      entry: './src/js/server/main.js',
      dest: './dist/',
    },
  },
};

const tasks = {
  JS_CLIENT: 'js_client',
  JS_SERVER: 'js_server',
  DEFAULT: 'default',
};

gulp.task(tasks.JS_CLIENT, function() {
  return gulp.src(paths.js.client.src)
    .pipe(rollup({
      entry: paths.js.client.entry,
      plugins: [
        babel({
          exclude: 'node_modules/**'
        }),
      ]
    }))
    .pipe(gulp.dest(paths.js.client.dest));
});

gulp.task(tasks.JS_SERVER, function() {
  return gulp.src(paths.js.server.src)
    .pipe(rollup({
      entry: paths.js.server.entry,
      plugins: [
        flow()
      ],
    }))
    .pipe(gulp.dest(paths.js.server.dest));
});

const ALL_TASKS = [
  tasks.JS_CLIENT,
  tasks.JS_SERVER,
];

gulp.task(tasks.DEFAULT, gulp.parallel(ALL_TASKS));