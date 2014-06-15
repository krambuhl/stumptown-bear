define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "icon",
        "text!templates/pressure.handlebars"
    ], function($, _, Backbone, Handlebars, icon, pressureTemplate) {
        
        return Backbone.View.extend({
            events: {
                "click .pressure-item": "setActive"
            },
            
            template: Handlebars.compile(pressureTemplate),
            
            initialize: function() {
                this.window = $(window);
                this.hb = $("html, body");
                this.render();
            },
            
            render: function() {
                this.setElement(this.template())
               
                this.$el.find('[data-icon]').each(function() {
                    icon.render(this)
                });
            },
            
            // event: user clicks pressure menu item 
            // response: give clicked element is-active class
            setActive: function(e) {
                var $target = $(e.currentTarget);
                    
                $target.addClass('is-active').siblings().removeClass('is-active');

                if (this.window.width() <= 640) {
                    this.hb.animate({ scrollTop:(this.window.width() <= 480 ? $(".content").position().top - 20 : this.$el.position().top) }, 360);
                }
            },
            
            yieldActive: function(name) {
                var $target = (function(match) {
                    var $items = this.$el.find('.pressure-item');
                    switch (name) {
                        case "design":  return $items.eq(0);
                        case "code":    return $items.eq(1);
                        case "timeline": return $items.eq(2);
                        case "contact": return $items.eq(3);
                    }
                }).call(this, name);
                
                $target.addClass('is-active').siblings().removeClass('is-active');
            }
        });
    }
)