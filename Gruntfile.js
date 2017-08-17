'use strict';

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.config.js');

module.exports = function (grunt) {

    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= props.license %> */\n',
        // Task configuration
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['dist']
                }]
            },
            tmp: ".tmp/"
        },
        copy: {
            dist: {
                files: [
                    {
                        flatten: true,
                        expand: true,
                        src: ['src/*'],
                        dest: 'dist/',
                        filter: 'isFile'
                    }
                ]
            }
        },


        // //编译sass
        // sass: {
        //     dist: {
        //         options: {
        //             style: 'compact'
        //         },
        //         files: [{
        //             expand: true,
        //             cwd: 'src/sass',
        //             src: ['*.scss'],
        //             dest: 'src/css/',
        //             ext: '.css'
        //         }]
        //     }
        // },

        // //校验js
        // jshint: {
        //     beforeconcat: {
        //         src: 'src/js/*.js'
        //     },
        //     afterconcat: {
        //         options: {
        //             asi: true
        //         },
        //         src: 'dist/js/*.js'
        //     }
        // },

        // //合并文件
        // concat: {
        //     css: {
        //         src: ['src/css/*.css'],
        //         dest: '.tmp/css/style.css'
        //     },
        //     js: {
        //         src: ['src/js/*.js'],
        //         dest: '.tmp/js/index.js'
        //     }
        // },
        
        // //压缩js
        // uglify: {
        //     options: {
        //         banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        //             '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
        //     },
        //     dist: {
        //         src: '.tmp/js/index.js',
        //         dest: 'dist/js/index.min.js'
        //     }
        // },

        // //压缩css
        // cssmin: {
        //     dist: {
        //         src: '.tmp/css/style.css',
        //         dest: 'dist/css/style.min.css'
        //     }
        // },

        // //压缩图片
        // imagemin: {
        //     dynamic: {
        //         files: [{
        //             expand: true,
        //             cwd: 'src/',
        //             src: ['img/**/*.{png,jpg,gif}'],
        //             dest: 'dist/'
        //         }]
        //     }
        // },

        // //md5重命名
        // rev: {
        //     dist: {
        //         files: {
        //             src: [
        //                 'dist/css/{,*/}*.css',
        //                 'dist/js/{,*/}*.js',
        //                 'dist/img/{,*/}*.*',
        //                 'dist/fonts/{,*/}*.*',
        //                 'dist/*.{ico,png}'
        //             ]
        //         }
        //     }
        // },

        // //替换压缩后路径与rev重命名后路径
        // usemin: {
        //     html: 'dist/*.html',
        //     css: 'dist/css/{,*/}*.css',
        //     options: {
        //         blockReplacements: {
        //             css: function(block) {
        //                 return '<link rel="stylesheet" type="text/css" href="'+block.dest+'">';
        //             },
        //             js: function(block) {
        //                 return '<script type="text/javascript" src="'+block.dest+'"></script>';
        //             }
        //         }
        //     }
        // },

        // //压缩html
        // htmlmin: {
        //     dist: {
        //         options: {
        //             collapseBooleanAttributes: true,
        //             collapseWhitespace: true,
        //             conservativeCollapse: true,
        //             removeAttributeQuotes: true,
        //             removeCommentsFromCDATA: true,
        //             removeEmptyAttributes: true
        //         },
        //         files: [{
        //             expand: true,
        //             cwd: 'dist',
        //             src: '{,*/}*.html',
        //             dest: 'dist'
        //         }]
        //     }
        // },


        // //启动web服务
        // connect: {
        //     options: {
        //         port: 9000,
        //         hostname: 'localhost',
        //         open: true,
        //         livereload: 35729
        //     },
        //     test: {
        //         options: {
        //             open: {
        //                 target: 'http://localhost:9000/src'
        //             },
        //             middleware: function(connect, options, middlwares) {
        //                 return [
        //                     require('connect-livereload')({
        //                         hostname:'localhost',
        //                         port:35729
        //                     }),
        //                     require('serve-static')('.'),
        //                     require('serve-index')('.')
        //                 ];
        //             }
        //         }
        //     },
        //     dist: {
        //         options: {
        //             base: 'dist',
        //             livereload: false,
        //             keepalive: true,
        //             hostname: '0.0.0.0'
        //         }
        //     }
        // },
        connect: {
            options: {
                port: 8000
            },

            dist: {
                options: {
                    keepalive: true,
                    middleware: function(connect, options, middlwares) {
                        return [
                            require('serve-static')('.'),
                            require('serve-index')('.')
                        ];
                    }
                }
            }
        },

        open: {
            options: {
                delay: 500
            },
            dev: {
                path: 'http://localhost:<%= connect.options.port %>/webpack-dev-server/'
            },
            dist: {
                path: 'http://localhost:<%= connect.options.port %>/'
            }
        },

        //启动karma测试
        karma: {
          unit: {
            configFile: 'karma.conf.js',
            background: true,
            singleRun: false,
            autoWatch: false
          }
        },

        webpack: {
            options: webpackDistConfig,
            dist: {
                cache: false
            }
        },

        'webpack-dev-server': {
            options: {
                hot: true,
                port: 8000,
                webpack: webpackDevConfig,
                publicPath: '/assets/',
                contentBase: './src/'
            },
            start: {
                keepAlive: true
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    // grunt.loadNpmTasks('grunt-rev');
    // grunt.loadNpmTasks('grunt-usemin');
    // grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-webpack');
    

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:dist', 'connect:dist']);
        }

        grunt.task.run([
            'open:dev',
            'webpack-dev-server'
        ]);
    });
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['clean', 'copy', 'webpack']);
    grunt.registerTask('default', []);
};

