require.config({
    baseUrl: "assets",
    paths: {
        jquery: "../bower_components/jquery/jquery",
        underscore: "../bower_components/underscore/underscore",
        backbone: "../bower_components/backbone/backbone",
        handlebars: "../bower_components/handlebars/handlebars",
        requirejs: "../bower_components/requirejs/require",
        hbs: "library/hbs",
        text: "library/text",
        icon: "library/icon",
        app: "app",
        templates: "app/templates"
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
            exports: "icon"
        }
    }
});




require([
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
    
    
});