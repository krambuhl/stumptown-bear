define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "icon",
        
        "app/views/headerView",
        "app/views/pressureView"
    ], function($, _, Backbone, Handlebars, icon, headerView, pressureView) {
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
                
                this.$el.children('.yield').remove();
                
                if (route == "design") {
                    requirejs(["app/collections/designs", "app/views/designView"], function(Designs, designView){
                        that.$el.append(new designView({ collection: new Designs() }))
                    })
                } else if (route == "history") {
                    requirejs(["app/collections/timelines", "app/views/timelineView"], function(Timlines, timelineView){
                        that.$el.append(new timelineView({ collection: new Timlines() }))
                    })
                } else if (route == "contact") {
                    requirejs(["app/views/contactView"], function(contactView){
                        that.$el.append(new contactView())
                    })
                } else {
                    console.log(route)
                }
                
                this.pressure.yieldActive(route);
            }
        });
        
        
    }
)