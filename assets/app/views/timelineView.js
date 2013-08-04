define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "app/views/timelineItemView",
        "text!templates/timeline.handlebars"
    ], function($, _, Backbone, Handlebars, TimelineItem, timelineTemplate) {
        
        return Backbone.View.extend({
            el: ".stb",
        
            events: {
            },
            
            template: Handlebars.compile(timelineTemplate),
            
            initialize: function() {
                this.$el.append(this.template);
                this.$timeline = this.$el.find('.js-timeline');
                
                this.items = [];
                this.itemsOffset = [];
                this.activeItem = 0 // index corresponds to this.items[this.activeItem] to keep data lean
                
                this.collection.on('reset', function() {
                    this.renderAll();
                }, this);

                this.collection.on('add', function(model) {
                    this.renderTimelineItem(model);
                }, this);
                
                this.collection.fetch();
                
                $(window).on('resize', _.bind(function() {
                    this.setOffset($(window).height() / 3.5);
                }, this)).on('scroll touchstart touchmove', _.bind(function() {
                    this.setActiveItem($(window).scrollTop() + this.offset)
                }, this));
            },
            
            renderAll: function() {
                this.items = [];
                this.itemsOffset = [];
                
                _.each(this.collection.models, function(model) {
                    this.renderTimelineItem(model);
                }, this);
            },
            
            renderTimelineItem: function(model) {                       
                var timelineItemView = new TimelineItem(model.attributes);
                this.$timeline.append(timelineItemView.$el);
                
                this.items.push(timelineItemView);
                this.itemsOffset.push(timelineItemView.$el.offset().top);

                _.defer(function() { 
                    $(window).trigger('resize').trigger('scroll');
                })
            },
            
            setOffset: function(offset) {
                this.offset = offset;
                $('body').css('padding-bottom', parseInt(this.offset * 1.5));
            },
            
            setActiveItem: function (offset) {
                var that = this, 
                    closest = null;
                    
                _.each(this.itemsOffset, function(val) {
                    if (closest == null || Math.abs(val - offset) < Math.abs(closest - offset))  closest = val;
                });
                
                this.activeItem = _.indexOf(this.itemsOffset, closest);
                this.activeItem = this.activeItem == -1 ? 0 : this.activeItem;
                
                _.each(this.items, function(val, index) { 
                    if (index == this.activeItem)
                         this.items[index].activeState(true);
                    else this.items[index].activeState(false);
                }, this)
            }
            
        });
    }
)