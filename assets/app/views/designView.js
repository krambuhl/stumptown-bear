define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "app/views/designItemView",
        "text!templates/design.handlebars"
    ], function($, _, Backbone, Handlebars, DesignItem, designTemplate) {
        
        return Backbone.View.extend({
            el: ".stb",
        
            events: { },
            
            template: Handlebars.compile(designTemplate),
            
            initialize: function() {
                this.setElement(this.template())
                this.$loader = this.$el.find('.js-loader');
                this.$samples = this.$el.find('.js-samples');
                this.items = [];
                
                this.collection.on('reset', function() {
                    this.renderAll();
                }, this);

                this.collection.on('add', function(model) {
                    this.renderDesignItem(model);
                }, this);
                
                this.collection.fetch({reset: true});

                this.$el.closest('.js-yield').css('padding-bottom', 0);
                this.$el.find('[data-icon]').each(function() {
                    icon.render(this)
                });
            },
            
            renderAll: function() {
                this.$samples.empty();
                
                _.each(this.collection.models, function(model) {
                    this.renderDesignItem(model);
                }, this);

                _.defer(_.bind(function() { 
                    var imagesToPreload = [];
                    _.each(this.items, function(item) {
                        imagesToPreload.push(item.$el.find('.samples-image').map(function() {
                            return $(this).css('background-image').replace('url(','').replace(')','').split('"')[1]
                        }).get());
                    });
                    
                    this.preloadImages(_.flatten(imagesToPreload), _.bind(function() {
                        this.$loader.addClass('is-hidden');
                        this.$samples.removeClass('is-hidden');
                    }, this));
                    
                    _.delay(_.bind(function() { 
                        this.$loader.addClass('is-hidden');
                        this.$samples.removeClass('is-hidden');
                    }, this), 1500);

                    $(window).trigger('resize');
                }, this));
            },
            
            renderDesignItem: function(model) {                       
                var DesignItemView = new DesignItem(model.attributes);
                this.$samples.append(DesignItemView.$el);
                this.items.push(DesignItemView);
            },
            
            // eikes / imgpreload.js
            // https://gist.github.com/eikes/3925183
            // Copyright (C) 2012 Eike Send
            preloadImages: function(imgList, callback) {
                var loaded = 0, images = [];
                var inc = function() {
                    loaded += 1;
                    if (loaded === imgList.length && callback) callback();
                };

                for (var i = 0; i < imgList.length; i++) {
                    images[i] = new Image();
                    images[i].onabort = inc;
                    images[i].onerror = inc;
                    images[i].onload = inc;
                    images[i].src = imgList[i];
                }
            }
        });
    }
)