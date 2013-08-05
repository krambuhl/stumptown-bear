define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
//        "app/views/codeItemView",
        "text!templates/code.handlebars"
    ], function($, _, Backbone, Handlebars, codeTemplate) {
        
        return Backbone.View.extend({ 
            events: {
                
            },
            
            template: Handlebars.compile(codeTemplate),
            
            initialize: function() {
                this.setElement(this.template());
                this.$code = this.$el.find('.js-codes');
                
                this.collection.on('reset', function() {
                    this.renderAll();
                }, this);

                this.collection.on('add', function(model) {
                    this.renderDesignItem(model);
                }, this);
                
                //this.collection.fetch();
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