define([  
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "icon",
        "text!templates/timelineItem.handlebars"
    ], function($, _, Backbone, Handlebars, icon, timelineItemTemplate) {
        
        return Backbone.View.extend({
            events: {
            },
            
            template: Handlebars.compile(timelineItemTemplate),
            
            initialize: function (model) {
                var that = this;
                this.render(model);
            },
            
            render: function(model) {
                var that = this;
                this.setElement(this.template(model));
                
                _.defer(function() { 
                    that.renderIcons.call(that); 
                    that.offsetTop = that.$el.offset().top;
                });
            },
            
            renderIcons: function() {
                this.$el.find('[data-icon]').each(function() {
                    icon.render(this);
                });
            },
            
            activeState: function(active) {                
                if (active)  this.$el.addClass('is-active')
                if (!active) this.$el.removeClass('is-active')
            }
        });
    }
)