require.config({
    baseUrl: "assets/scripts",
    paths: {
        jquery: "../library/jquery",
        underscore: "../library/backbone/underscore",
        backbone: "../library/backbone/backbone",
        hbs: "../library/backbone/hbs",
        text: "../library/backbone/text",
        handlebars: "../library/handlebars",
        icon: "../library/icon",
        
        app: "../app",
        templates: "../app/templates",
        data: "../data"
    },
    
    waitSeconds: 15,
    
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        
        'underscore': {
            exports: '_'
        },
        
        'handlebars': {
            exports: 'Handlebars'
        },
        
        'icon': {
            exports: 'icon'
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