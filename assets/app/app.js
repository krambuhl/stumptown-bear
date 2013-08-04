define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "icon",
        
        "app/views/headerView",
        "app/views/pressureView",
        "app/views/contentView",
        "app/views/footerView"
    ], function($, _, Backbone, Handlebars, icon, headerView, pressureView, contentView, footerView) {
        return Backbone.View.extend({
            el: $(".layout-stb"),
            
            initialize: function( ){
                this.views = [];
                icon.load("assets/data/stb.json")
                this.render();
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
                
                console.log(this.$el);
            },
            
            yield: function(route) {
                var that = this;
                this.pressure.yieldActive(route);
                this.content.yield(route);
            }
        });
        
        
    }
)