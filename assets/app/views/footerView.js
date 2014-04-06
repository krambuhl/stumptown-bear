define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "icon",
        "text!templates/footer.handlebars"
    ], function($, _, Backbone, Handlebars, icon, footerTemplate) {
        return Backbone.View.extend({
            initialize: function() {
                this.render();
            },
        
            template: Handlebars.compile(footerTemplate),
            
            render: function() {
                this.setElement(this.template());
               
                this.$el.find('[data-icon]').each(function() {
                    icon.render(this)
                });
            }
        });
    }
)