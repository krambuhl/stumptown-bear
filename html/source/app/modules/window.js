Stump.WindowView = Patchbay.View.extend({
  el: window,
  
  setup: function() {
    this.app = window.app;

    this.set('isResizing', false);
    this.set('isScrolling', false);
    
    this.buildSize();
    this.buildScroll();
    this.buildEvent();

    this.listenTo(this.$el, 'resize', _.bind(this.onResize, this))
      .listenTo(this.$el, 'scroll', _.bind(this.onScroll, this));

    _.delay(function(self) {
      self.$el.trigger('resize').trigger('scroll');
    }, 250, this);
  },

  buildScroll: function() {
    var top = this.$el.scrollTop();
    this.scroll = {
      scrollTop: top,
      scrollBottom: top + this.size.height,
    };
  },

  buildSize: function() {
    this.size = {
      width: this.$el.width(),
      height: this.$el.height(),
      screenWidth: this.el.outerWidth,
      screenHeight: this.el.outerHeight
    };
  },

  buildEvent: function() {
    this.data = _.extend({
      isResizing: this.get('isResizing'),
      isScrolling: this.get('isScrolling'),
      scrollTop: this.get('scrollTop')
    }, this.size, this.scroll);
  },

  onResize: _.throttle(function() {
    this.buildSize();
    this.buildEvent();

    if (!this.get('isResizing')) {
      this.resizeStart();
    }

    this.trigger('resize', this.data);

    clearTimeout(this.resizeTimer);
    this.resizeTimer = _.delay(_.bind(this.resizeEnd, this), 100);
  }, 25),

  resizeStart: function() {
    this.set('isResizing', true);
    this.trigger('resize:start', this.data);
  },

  resizeEnd: function() {
    this.set('isResizing', false);
    this.trigger('resize:end', this.data);
  },

  onScroll: _.throttle(function() {
    this.buildScroll();
    this.buildEvent();

    if (!this.get('isScrolling')) {
      this.scrollStart();
    }

    this.trigger('scroll', this.data);

    clearTimeout(this.scrollTimer);
    this.scrollTimer = _.delay(_.bind(this.scrollEnd, this), 100);
  }, 25),

  scrollStart: function() {
    this.set('isScrolling', true);
    this.app.state('scrolling', true);
    this.trigger('scroll:start', this.data);
  },
  
  scrollEnd: function() {
    this.set('isScrolling', false);
    this.app.state('scrolling', false);
    this.trigger('scroll:end', this.data);
  }
});