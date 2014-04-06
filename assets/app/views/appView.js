define([
    "jquery",
    "underscore",
    "backbone",
    "handlebars",
    "icon",
    "fastclick",
    
    "app/views/headerView",
    "app/views/pressureView",
    "app/views/contentView",
    "app/views/footerView"
], function($, _, Backbone, Handlebars, icon, FastClick, headerView, pressureView, contentView, footerView) {
    return Backbone.View.extend({
        el: $(".layout-stb"),
        
        initialize: function( ){
            this.views = [];
            icon.load("assets/data/stb.json")
            this.render();

            FastClick.attach(document.body);
        },
        
        render: function() {
            this.header   = new headerView();
            this.pressure = new pressureView();
            this.content  = new contentView();
            this.footer   = new footerView();
            
            this.views = [
                this.header,
                this.pressure,
                this.content,
                this.footer
            ];
            
            this.$el.append(_.map(this.views, function(view) { return view.el; }));
        },
        
        yield: function(route) {
            var that = this;
            this.pressure.yieldActive(route);
            this.content.yield(route);
        }
    });   
});