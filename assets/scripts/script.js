require.config({
    baseUrl: "assets",
    paths: {
        jquery: "library/jquery",
        underscore: "../bower_components/underscore/underscore",
        backbone: "../bower_components/backbone/backbone",
        handlebars: "../bower_components/handlebars/handlebars",
        requirejs: "../bower_components/requirejs/require",
        fastclick: "../bower_components/fastclick/lib/fastclick",
        hbs: "library/hbs",
        text: "library/text",
        icon: "library/icon",
        app: "app",
        templates: "app/templates",
        bundle: "scripts/bundle"
    },
    waitSeconds: 15,
    shim: {
        backbone: {
            deps: [
                "underscore",
                "jquery"
            ],
            exports: "Backbone"
        },
        underscore: {
            exports: "_"
        },
        handlebars: {
            exports: "Handlebars"
        },
        icon: {
            deps: [
                "underscore"
            ],
            exports: "icon"
        }
    }
});


define([
    'backbone',
    'app/router'
], function (Backbone, Router) {
    _.mixin({
        capitalize : function(string) {
            return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
        }
    });
    
    // Initialize routing and start Backbone.history()
    new Router();
    Backbone.history.start();

    if ('ontouchstart' in window || 'onmsgesturechange' in window) {
        $("html").addClass('has-touch');
    }
});