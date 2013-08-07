define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "text!templates/contact.handlebars"
    ], function($, _, Backbone, Handlebars, contactTemplate) {
        
        return Backbone.View.extend({
            events: { },
            
            template: Handlebars.compile(contactTemplate),
            
            initialize: function() {
                this.setElement(this.template());
                
                _.defer(_.bind(function() {
                    this.$el.find('[data-icon]').each(function() {
                        icon.render(this);
                    });
                }, this));
            }
        });
    }
)