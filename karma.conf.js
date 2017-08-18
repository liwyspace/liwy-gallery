// Karma configuration
// Generated on Fri Aug 11 2017 18:36:11 GMT+0800 (中国标准时间)

var webpackConfig = require('./webpack.test.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['test/**/*.js'],
    exclude: ['test/coverage/**/*'],
    preprocessors: {'test/**/*.js':['webpack','coverage']},
    reporters: ['progress','coverage'],
    coverageReporter:{type:'html',dir:'test/coverage/'},
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      }
    }

  })
}
