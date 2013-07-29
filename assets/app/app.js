define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "icon",
        
        "app/collections/designs",
        
        "app/views/headerView",
        "app/views/pressureView"
    ], function($, _, Backbone, Handlebars, icon, Designs, headerView, pressureView) {
        return Backbone.View.extend({
            el: $(".layout-stb"),
            
            initialize: function( ){
                icon.load("assets/data/stb.json")
                this.render();
            },
            
            render: function() {
                this.header   = new headerView();
                this.pressure = new pressureView();
                
                this.$el.append(this.header.el, this.pressure.el);
            },
            
            yield: function(route) {
                var that = this;
                
                this.$el.children('.yield').fadeOut(function() {
                    $(this).remove();
                });
                
                if (route == "design") {
                    requirejs(["app/views/designView"], function(designView){
                        that.$el.append(new designView({ collection: new Designs() }))
                    })
                } else {
                    console.log(route)
                }
                
                this.pressure.yieldActive(route);
            }
        });
        
        
    }
)