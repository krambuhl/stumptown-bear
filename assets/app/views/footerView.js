define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "icon",
        "text!templates/footer.handlebars"
    ], function($, _, Backbone, Handlebars, icon, footerTemplate) {
        return Backbone.View.extend({
            events: {
                "click a": "setActive"
            },
            initialize: function() {
                this.render();

                this.window = $(window);
                this.hb = $("html, body");
            },
        
            template: Handlebars.compile(footerTemplate),
            
            render: function() {
                this.setElement(this.template());
               
                this.$el.find('[data-icon]').each(function() {
                    icon.render(this)
                });
            },

            setActive: function() {
                this.hb.animate({ scrollTop: $(".content").position().top - 20 }, 0);
            }
        });
    }
)