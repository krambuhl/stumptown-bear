define([  
        "underscore",
        "backbone",
        "handlebars",
        "icon",
        "app/collections/designs",
        "text!templates/designItem.handlebars"
    ], function(_, Backbone, Handlebars, icon, Designs, designItemTemplate) {
        return Backbone.View.extend({
            events: {
                "click .samples-image": "swapPreviewImage",
                "hover .samples-image": "swapPreviewImage",
                "click .samples-preview": "openPreview",
                "click .samples-preview-close": "closePreview",
                
                "mouseenter .samples-preview": "startPreviewTimer",
                "mouseleave .samples-preview": "cancelPreviewTimer"
            },
            
            template: Handlebars.compile(designItemTemplate),
            
            initialize: function (model) {
                var that = this;
                
                this.$window = $(window);
                this.render(model);

                
                this.$window.on('keydown.' + this.cid, function(e) {
                     if (e.which == 27) that.closePreview().cancelPreviewTimer();
                }).on("resize", function() {
                    that.isMobile = that.$window.outerWidth() < 640 ? true : false;
                    that.resizeActiveImage();
                })
            },
            
            render: function(model) {
                var that = this;
                this.setElement(this.template(model));
                
                _.defer(function() { 
                    that.ui = {
                        sampleImages: that.$(".samples-image")
                    };

                    that.renderIcons.call(that); 
                    $(window).trigger('resize');

                    that.setupImageDimensions();
                    _.delay(function() {
                        that.ui.sampleImages.eq(0).trigger('click');
                    }, 1000);
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

                if (!this.isCloseClick && !this.isMobile) {
                    this.$el.addClass('is-active')
                        .siblings().removeClass('is-active');
                }
                
                return this;
            },
            
            closePreview: function() {
                var that = this;

                that.isCloseClick = true;
                this.$el.removeClass('is-active');

                _.delay(function() {
                    that.isCloseClick = false;
                }, 5);
                return this;
            },

            setupImageDimensions: function() {
                var that = this;
                this.ui.sampleImages.each(function() {
                    that.queueImageLoad($(this));
                });

                this.execImageQueue();
            },

            queueImageLoad: function(el) {
                if (!this.preloadings) {
                    this.preloadings = [el];
                } else {
                    this.preloadings.push(el);
                }
            },

            execImageQueue: function() {
                var that = this,
                    index = 0,
                    total = this.preloadings.length;

                var repeater = setInterval(function() {
                    that.setImageDimensions(that.preloadings[index++]);

                    if (index == total) {
                        clearInterval(repeater);
                    }
                }, _.random(25, 75));
            },

            setImageDimensions: function(el) {
                var url = el.css('background-image').replace('url(','').replace(')','');
                $("<img/>").attr("src", url).load(function() {
                    el.attr({
                        "data-width": this.width,
                        "data-height": this.height,
                        "data-ratio": (this.height / this.width)
                    });
                }); 
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
                
                // add active class to selected image
                if ($target.hasClass('samples-image')) {
                    $target.addClass('is-active')
                        .siblings()
                            .removeClass('is-active')
                            .css("padding-bottom", "");

                    this.currentTarget = $target;
                    this.resizeActiveImage();
                }

                return this;
            },

            // action: user resizes window
            // response: 
            resizeActiveImage: function() {
                if (this.currentTarget) {
                    var that = this;
                        target = this.currentTarget;

                    if (this.isMobile) {
                        target.css("padding-bottom", target.attr("data-ratio") * 100 + "%");
                    } else {
                        target.css("padding-bottom", "");
                    }
                } 

                return this;
            }
        });
    }
)