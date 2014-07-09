module.exports = function (grunt) {
    // load NPM Tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*
            Iconizr

            compile icon files from svgs
        */

        iconizr: {
            options: {
                prefix: 'icon',
                verbose: 1
            },
            generate: {
                src: 'source/svg',
                dest: 'dist/svg',
            }
        }
    });


    // Define Tasks

    // icons
    grunt.registerTask('icons', ['iconizr']);
    grunt.registerTask('heroku-build', ['iconizr']);

};
