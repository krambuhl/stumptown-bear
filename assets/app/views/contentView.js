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
                    
                    if (route != "contact") 
                        requireList.push("app/collections/" + route + "s");
                    
                    this.setLoading();
                    
                    requirejs(requireList, function(view, Collection) {
                        var view = (function(view, Collection) {
                            if (Collection !== undefined) return new view({ collection: new Collection() });
                            return new view();
                        })(view, Collection);
                    
                        that.$placeholders.filter('[data-page=' + route + ']').replaceWith(view.el);
                        $.extend(that.$content, view);
                    
                        that.$activePage = view.$el;
                        that.setActive(that.$activePage);
                    });
                } else {
                    that.$activePage = this.$el.find('[data-page=' + route + ']')
                    that.setActive(that.$activePage);
                }
            },
            
            setLoading: function()  {
                this.$activePage = this.$el.find('[data-page=loading]');
                this.setActive(this.$activePage);
                return this;
            },
            
            setActive: function($page) {
                $page.addClass('is-active').siblings().removeClass('is-active');
                return this;
            },
        });
    }
)