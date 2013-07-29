define([  
        "underscore",
        "backbone",
        "handlebars",
        "app/collections/designs",
        "text!templates/designItem.handlebars"
    ], function(_, Backbone, Handlebars, Designs, designItemTemplate) {
        
        return Backbone.View.extend({
            events: {
                "click .samples-image": "swapPreviewImage",
                "click .samples-preview": "openPreview",
                "click .samples-preview-close": "closePreview",
                
                "mouseenter .samples-preview": "startPreviewTimer",
                "mouseleave .samples-preview": "cancelPreviewTimer"
            },
            
            template: Handlebars.compile(designItemTemplate),
            
            initialize: function (model) {
                var that = this;
                this.render(model);
                
                $(window).on('keydown.' + this.cid, function(e) {
                     if (e.which == 27) that.closePreview().cancelPreviewTimer();
                });
            },
            
            render: function(model) {
                var that = this;
                this.setElement(this.template(model));
                
                _.defer(function() { 
                    that.renderIcons.call(that); 
                });
            },
            
            remove: function() {
                $(window).off('keydown.' + this.cid);
            },
            
            renderIcons: function() {
                this.$el.find('[data-icon]').each(function() {
                    icon.render(this);
                });
                
                return this;
            },
            
            startPreviewTimer: function() {
                if (this.$el.hasClass('.is-active')) return this;
                
                this.previewTimer = setTimeout(_.bind(function() {
                    this.openPreview().swapPreviewImage();
                }, this), 1000);
                
                return this;
            },
            
            cancelPreviewTimer: function() {
                clearTimeout(this.previewTimer);
                return this;
            },
            
            openPreview: function() {
                this.cancelPreviewTimer();
                
                this.$el.addClass('is-active')
                    .siblings().removeClass('is-active');
                
                return this;
            },
            
            closePreview: function() {
                this.$el.removeClass('is-active');
                return this;
            },
            
            // action: user clicks preview img container
            // response: set active large preview to clicked img
            swapPreviewImage: function(e) {
                var $target = (e !== undefined) ? $(e.currentTarget) : this.$el.find('.samples-image').eq(0),
                    $context = $target.parent().siblings('.samples-preview-expand'),
                    src = $target.css('background-image');
                    
                if (src == $context.children('.is-active').css('background-image')) return this;
                    
                // set the non-active img src to clicked src
                $context.children(':not(.is-active)').css('background-image', src);
                
                // toggle active class
                $context.children('div').toggleClass('is-active');
                
                return this;
            }
        });
    }
)