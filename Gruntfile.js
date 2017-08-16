'use strict';

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
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: ['src/images/*'],
                        dest: 'dist/images/'
                    }
                ]
            }
        },

    

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/liwy-gallery.min.js'
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

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

