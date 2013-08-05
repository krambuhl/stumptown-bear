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
                
                console.log(this.$el.closest('.js-yield'))

                this.$el.closest('.js-yield').css('padding-bottom', 0);
                this.$el.find('[data-icon]').each(function() {
                    icon.render(this)
                });
            }
        });
    }
)