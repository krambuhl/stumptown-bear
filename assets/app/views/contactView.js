define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "text!templates/contact.handlebars"
    ], function($, _, Backbone, Handlebars, contactTemplate) {
        
        return Backbone.View.extend({
            el: ".stb",
        
            events: { },
            
            template: Handlebars.compile(contactTemplate),
            
            initialize: function() {
                this.$el.append(this.template());
                
                $('body').css('padding-bottom', 0);
                this.$el.find('[data-icon]').each(function() {
                    icon.render(this)
                });
            }
        });
    }
)