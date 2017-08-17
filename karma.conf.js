// Karma configuration
// Generated on Fri Aug 11 2017 18:36:11 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['src/js/**/*.js','test/js/**/*.js'],
    exclude: [],
    preprocessors: {'test/js/*.js':'coverage'},
    reporters: ['progress','coverage'],
    coverageReporter:{type:'html',dir:'test/coverage/'},
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
