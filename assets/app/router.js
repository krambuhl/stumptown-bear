define([
    "backbone",
    "app/app"
], function(Backbone, AppView) {
    return Backbone.Router.extend({
        initialize: function() {
            //this.bind( "all", this.debug);
            
            // Initialize the application view
            this.App = new AppView();
        },

        routes: {
            "":  "design",
            "design/":  "design",
            "code/":    "code",
            "history/": "history",
            "contact/": "contact"
        },
        
        debug: function(msg) {
            console.log(msg);
        },
        
        design:  function() { this.App.yield('design'); },
        code:    function() { this.App.yield('code'); },
        history: function() { this.App.yield('history'); },
        contact: function() { this.App.yield('contact'); }
    });
})