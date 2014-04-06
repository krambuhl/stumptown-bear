var percentBetween = function(n1, n2, pos) {
    return Math.floor(pos * n2) + n1;
};

module.exports = function (grunt) {
    // load NPM Tasks
    
    // Bower Tasks
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-bower-requirejs');

    // Contrib Tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-requirejs');


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // WATCH -- File Watching
        watch: {
            styles: {
                files: ['assets/sass/**/*.scss'],
                tasks: ['clean:0', 'compass:dev']
            },
            
            options: {
                spawn: false,
                interrupt: true,
                livereload: true
            }
        },

        // TASKS
        clean: ['assets/style/', 'tmp/'],


        compass: { // Task
            options: { // Target options
                sassDir: 'assets/sass/',
                cssDir: 'assets/style/',
                noLineComments: true
            },
            
            dist: { 
                options: {
                    outputStyle: "compressed",
                    environment: "production"
                }
            },
            
            dev: { 
                options: {
                    outputStyle: "nested",
                    environment: "development"
                }
            }
        }
    });


    // Define Tasks
    
    // Default Task
    grunt.registerTask('default', ['develop']);
    
    // Build Tasks
    grunt.registerTask('production', ['clean', 'compass:dist'])
    grunt.registerTask('develop', ['clean', 'compass:dev', 'watch']);
    
    // Component Installs
    grunt.registerTask('install', ['bower-install']);
    grunt.registerTask('bower-install', function () {
        require('bower').commands
            .install([
                'jquery',
                'underscore',
                'backbone',
                'requirejs',
                'handlebars',
                'jasmine',
                'fastclick'
            ]).on('end', this.async());
    });

};