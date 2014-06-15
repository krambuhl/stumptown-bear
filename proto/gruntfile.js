 module.exports = function (grunt) {
    // load NPM Tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*
            Icons
                - svgmin: Minify SVG files (remove cruft)
                - grunticon: compile icon files from svgs

        */

        svgmin: {
            options: {
                plugins: [
                  { removeViewBox: false },
                  { removeUselessStrokeAndFill: false }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'source/svg/',
                    dest: 'dist/svg/',
                    src: '*.svg'
                }]
            }
        },

        grunticon: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist/svg',
                    src: ['*.svg', '*.png'],
                    dest: 'dist/svg'
                }]
            }
        }
    });


    // Define Tasks

    // icons
    grunt.registerTask('icons', ['svgmin', 'grunticon']);

};
