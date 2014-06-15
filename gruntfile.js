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
            }
        },

        bower: {
            target: {
                rjsConfig: 'assets/script/script.js'
            }
        },

        // TASKS
        clean: ['assets/style/', 'tmp/'],

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
    grunt.registerTask('default', ['production']);

    // Build Tasks
    grunt.registerTask('production', ['clean', 'compass:dist']);
    grunt.registerTask('develop', ['clean', 'compass:dev']);
};
