require.config({
    baseUrl: "assets",
    paths: {
        jquery: "../../bower_components/jquery/jquery",
        underscore: "../../bower_components/underscore/underscore",
        backbone: "../../bower_components/backbone/backbone",
        handlebars: "../../bower_components/handlebars/handlebars.runtime",
        requirejs: "../../bower_components/requirejs/require",
        hbs: "library/backbone/hbs",
        text: "library/backbone/text",
        icon: "library/icon",
        app: "app",
        templates: "templates"
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