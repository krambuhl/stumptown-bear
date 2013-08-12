define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "app/views/codeItemView",
        "text!templates/code.handlebars"
    ], function($, _, Backbone, Handlebars, CodeItem, codeTemplate) {
        
        return Backbone.View.extend({ 
            events: {
                
            },
            
            template: Handlebars.compile(codeTemplate),
            
            initialize: function() {
                this.setElement(this.template());
                this.$codes = this.$el.find('.js-codes');
                
                this.collection.on('reset', function() {
                    this.renderAll();
                }, this);

                this.collection.on('add', function(model) {
                    this.renderCodeItem(model);
                }, this);
                
                this.collection.fetch({reset: true});
            },
            
            renderAll: function() {
                _.each(this.collection.models, function(model) {
                    this.renderCodeItem(model);
                }, this);
            },
            
            renderCodeItem: function(model) {                       
                var CodeItemView = new CodeItem(model.attributes);
                this.$codes.append(CodeItemView.$el);
            }
        });
    }
)