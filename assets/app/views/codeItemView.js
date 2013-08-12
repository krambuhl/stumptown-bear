define([  
        "underscore",
        "backbone",
        "handlebars",
        "icon",
        "app/collections/codes",
        "text!templates/codeItem.handlebars"
    ], function(_, Backbone, Handlebars, icon, Codes, codeItemTemplate) {
        
        return Backbone.View.extend({
            events: { },
            
            template: Handlebars.compile(codeItemTemplate),
            
            initialize: function (model) {
                var that = this;
                this.render(model);
            },
            
            render: function(model) {
                var that = this;
                this.setElement(this.template(model));
                
                _.defer(_.bind(function() { 
                    this.$el.find('[data-icon]').each(function() {
                        icon.render(this);
                    });
                }, this))
            }
        });
    }
)