define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "icon",
        "app/views/designItemView",
        "text!templates/design.handlebars"
    ], function($, _, Backbone, Handlebars, icon, DesignItem, designTemplate) {
        
        return Backbone.View.extend({
            el: ".stb",
        
            events: {
                
            },
            
            template: Handlebars.compile(designTemplate),
            
            initialize: function() {
                this.$el.append(this.template);
                this.$samples = this.$el.find('.js-samples');
                
                this.collection.on('reset', function() {
                    this.renderAll();
                }, this);

                this.collection.on('add', function(model) {
                    this.renderDesignItem(model);
                }, this);
                
                this.collection.fetch();
            },
            
            renderAll: function() {
                _.each(this.collection.models, function(model) {
                    this.renderDesignItem(model);
                }, this);
            },
            
            renderDesignItem: function(model) {                       
                var DesignItemView = new DesignItem(model.attributes);
                this.$samples.append(DesignItemView.$el);
            }
        });
    }
)