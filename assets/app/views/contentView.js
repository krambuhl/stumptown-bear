define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "text!templates/content.handlebars"
    ], function($, _, Backbone, Handlebars, contentTemplate) {
        
        return Backbone.View.extend({
            events: { },
            
            template: Handlebars.compile(contentTemplate),
            
            initialize: function() {
                this.setElement(this.template());
                this.$content = $.makeArray([])

                this.$el.find('[data-icon]').each(function() {
                    icon.render(this);
                });
            },
            
            // pretty heavy function to load and keep content alive
            // waits for interaction to load content
            yield: function(route) {
                var that = this;
                this.$placeholders = this.$el.find('.content-item.is-placeholder');
                
                if (this.$placeholders.filter('[data-page=' + route + ']').length != 0) {
                    var requireList = ["app/views/" + route + "View"] 
                    
                    if (route != "contact") requireList.push("app/collections/" + route + "s")
                    
                    requirejs(requireList, function(view, Collection) {
                        var view = (function(view, Collection) {
                            if (Collection !== undefined) return new view({ collection: new Collection() });
                            return new view();
                        })(view, Collection);
                        
                        that.$placeholders.filter('[data-page=' + route + ']').replaceWith(view.el);
                        $.extend(that.$content, view);
            
                        that.$activePage = view.$el;
                        that.setActive(route);
                        that.setHeight(route);
                    })
                } else {
                    that.$activePage = this.$el.find('[data-page=' + route + ']')
                    that.setActive(route);
                    that.setHeight(route);
                }
                
                _.delay(function() {
                    that.setActive(route);
                    that.setHeight(route);
                }, 500)
            },
            
            setActive: _.debounce(function(page) {
                this.$activePage.addClass('is-active').siblings().removeClass('is-active');
                return this;
            }, 1),
            
            setHeight: _.debounce(function(page) {
                this.$el.find('.content-list').css('height', this.$activePage.children('.content-wrapper').outerHeight());
                
                this.$el.find('[data-icon]').each(function() {
                    icon.render(this);
                });
                
                return this;
            }, 150)
        });
    }
)