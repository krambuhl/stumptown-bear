define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "icon",
        "text!templates/header.handlebars"
    ], function($, _, Backbone, Handlebars, icon, headerTemplate) {
        
        return Backbone.View.extend({
            
            initialize: function() {
                this.render();
            },
        
            template: Handlebars.compile(headerTemplate),
            
            render: function() {
                this.setElement(this.template())
               
                this.$el.find('[data-icon]').each(function() {
                    icon.render(this)
                });
            }
        });
    }
)