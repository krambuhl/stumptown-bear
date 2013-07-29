module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // WATCH -- File Watching
        watch: {
            styles: {
                files: ['assets/style/**/*.scss', 'assets/style/*.scss'],
                tasks: ['develop']
            }
        },
        
        bower: {
            target: {
                rjsConfig: 'assets/library/require.config.js'
            }
        },

        // TASKS
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        compass: { // Task
            options: { // Target options
                sassDir: 'assets/style/',
                cssDir: 'assets/',
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

    // load NPM Tasks
    
    // Bower Tasks
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-bower-requirejs');

    // Contrib Tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Define Tasks
    grunt.registerTask('default', ['compass:dist']);
    grunt.registerTask('develop', ['compass:dev']);
    
    grunt.registerTask('install', ['bower-install', 'bower']);
    grunt.registerTask('bower-install', function () {
        require('bower').commands
            .install([
                'jquery',
                'underscore',
                'backbone',
                'requirejs',
                'handlebars'
            ]).on('end', this.async());
    });

};