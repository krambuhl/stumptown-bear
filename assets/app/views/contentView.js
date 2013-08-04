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
            
            yield: function(route) {
                var that = this;
                this.$placeholders = this.$el.find('.content-item.is-placeholder');
                
                if (route == "design") {
                    if (this.$placeholders.filter('[data-page=design]').length != 0) {
                        requirejs(["app/collections/designs", "app/views/designView"], function(Designs, designView) {
                            var view = new designView({ collection: new Designs() });
                            
                            that.$placeholders.filter('[data-page=design]').replaceWith(view.el);
                            $.extend(that.$content, view);
                
                            that.$activePage = view.$el;
                            that.setActive(route).setHeight(route);
                        })
                    } else {
                        that.$activePage = this.$el.find('[data-page=design]')
                        that.setActive(route).setHeight(route);
                    }
                } else if (route == "history") {
                    if (this.$placeholders.filter('[data-page=history]').length != 0) {
                        requirejs(["app/collections/timelines", "app/views/timelineView"], function(Timlines, timelineView){
                            var view = new timelineView({ collection: new Timlines() });
                            
                            that.$placeholders.filter('[data-page=history]').replaceWith(view.el);
                            $.extend(that.$content, view);                            
                            
                            that.$activePage = view.$el;
                            that.setActive(route).setHeight(route);
                        })
                    } else {
                        that.$activePage = this.$el.find('[data-page=history]')
                        that.setActive(route).setHeight(route);
                    }
                } else if (route == "contact") {
                    if (this.$placeholders.filter('[data-page=contact]').length != 0) {
                        requirejs(["app/views/contactView"], function(contactView) {
                            var view = new contactView();
                            
                            that.$placeholders.filter('[data-page=contact]').replaceWith(view.el);
                            $.extend(that.$content, view);                            
                            
                            that.$activePage = view.$el;
                            that.setActive(route).setHeight(route);
                        })
                    } else {
                        that.$activePage = this.$el.find('[data-page=contact]')
                        that.setActive(route).setHeight(route);
                    }
                }
                
                _.delay(function() {
                    that.setActive(route).setHeight(route);
                }, 012)
            },
            
            setActive: function(page) {
                this.$activePage.addClass('is-active').siblings().removeClass('is-active');
                return this;
            },
            
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