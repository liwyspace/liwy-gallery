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
            ' Licensed MIT */\n',
        // Task configuration
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['dist/']
                }]
            },
            test: "test/coverage/",
            docs: {
                src: ['docs/dist/','docs/src/assets/vendors/']
            }
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
            },
            docs: {
                files: [{
                    expand:true,
                    cwd: 'bower_components/jquery/dist',
                    src: ['jquery.min.js'],
                    dest: 'docs/src/assets/vendors/'
                },{
                    expand:true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: ['**'],
                    dest: 'docs/src/assets/vendors/bootstrap/'
                },{
                    expand:true,
                    cwd: 'dist/assets',
                    src: ['*'],
                    dest: 'docs/src/assets/vendors/liwy-gallery/'
                }]
            }
        },

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

        //替换压缩后路径与rev重命名后路径
        usemin: {
            html: 'docs/dist/*.html',
            options: {
                blockReplacements: {
                    css: function(block) {
                        return '<link rel="stylesheet" type="text/css" href="'+block.dest+'">';
                    },
                    js: function(block) {
                        return '<script type="text/javascript" src="'+block.dest+'"></script>';
                    }
                }
            }
        },

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
                    open: {
                        target: 'http://localhost:<%= connect.options.port %>/'
                    },
                    keepalive: true,
                    middleware: function(connect, options, middlwares) {
                        return [
                            require('serve-static')('dist'),
                            require('serve-index')('dist')
                        ];
                    }
                }
            },
            docs: {
                options: {
                    port: 9000,
                    livereload: true,
                    base:'docs/dist',
                    hostname: 'localhost',
                    open: {
                        target: 'http://localhost:9000/'
                    },
                    middleware: function(connect, options, middlwares) {
                        return [
                            require('connect-livereload')({
                                hostname:'localhost',
                                port:35729
                            }),
                            require('serve-static')('docs/dist'),
                            require('serve-index')('docs/dist')
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
                path: 'http://localhost:<%= connect.options.port %>/'
            }
        },

        //启动karma测试
        karma: {
          unit: {
            configFile: 'karma.conf.js'
          }
        },

        webpack: {
            dist:webpackDistConfig,
            docs: function(){
                webpackDistConfig.output.publicPath='assets/vendors/liwy-gallery/'
                return webpackDistConfig;
            }
        },

        'webpack-dev-server': {
            options: {
                webpack: webpackDevConfig,
                port: 8000,
                contentBase: './src',
                publicPath: '/assets/',
                hot: true
            },

            start: {
                 keepalive: true
            }
        },

        
        //编译sass
        sass: {
            docs: {
                options: {
                    style: 'expanded',
                    // includePaths: [ '<%= app.docs.src %>/assets/scss/']
                },
                files: [{
                    expand: true,
                    cwd: 'docs/src/assets/scss/',
                    src: '*.scss',
                    dest: 'docs/src/assets/css/',
                    ext: '.css'
                }]
            },
        },
        //为css添加浏览器前缀
        autoprefixer: {
            options: {
                browser:['last 2 versions', 'ie7', 'ie8', 'ie9', 'ie10', 'ie11']
            },
            docs: {
                files: [{
                    expand: true,
                    cwd: 'docs/dist/assets/css',
                    src: '*.css',
                    dest: 'docs/dist/assets/css'
                }]
            }
        },
        //压缩css
        cssmin: {
            docs: {
                files: [{
                    expand: true,
                    cwd: 'docs/dist/assets/css/',
                    src: '*.css',
                    dest: 'docs/dist/assets/css/',
                    ext: '.min.css'
                }]
            }
        },
        //校验js语法
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            docs: {
                src: 'docs/dist/assets/js/*.js'
            }
        },
        //压缩js
        uglify: {
            options: {
                banner: '<%=banner%>',
                sourceMap: true
            },
            docs: {
                files: [{
                    expand: true,
                    cwd: 'docs/dist/assets/js/',
                    src: '*.js',
                    dest: 'docs/dist/assets/js/',
                    ext: '.min.js'
                }]
            }
        },
        jekyll: {
            options: {
              config: '_config.yml'
            },
            dist: {}
        },
        //监听文件变化
        watch: {
            options: {
                livereload: true
            },
            sassDocs: {
                files: [ 'docs/src/assets/scss/*.scss' ],
                tasks: [ 'sass:docs' ]
            },
            docs: {
                files: [ 'docs/src/**/*'],
                tasks: [ 'jekyll']
            }
        },
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    // grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    // grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-jekyll');
    

    
    grunt.registerTask('test', ['clean:test','karma']);
    grunt.registerTask('build', function(target) {
        var webpack = 'webpack:dist';
        if(target==='docs') {
            webpack = 'webpack:docs';
        }
        grunt.task.run(['clean:dist', 'copy', webpack]);
    });
    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist']);
        }

        grunt.task.run(['open:dev','webpack-dev-server']);
    });
    grunt.registerTask('docs',['build:docs','clean:docs','copy:docs','sass:docs','jekyll','autoprefixer:docs',
        'cssmin:docs','jshint:docs','uglify:docs','usemin','connect:docs']);
    // grunt.registerTask('default', ['serve:dist']);
    grunt.registerTask('docsdev',['build:docs','clean:docs','copy:docs','sass:docs','jekyll','connect:docs','watch']);
    grunt.registerTask('default', ['docsdev']);
};

