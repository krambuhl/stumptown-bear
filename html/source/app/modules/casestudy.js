Stump.CasestudyView = Patchbay.View.extend({
  ui: {
    infoControl: '.project-nav-information',
    galleryControl: '.project-nav-gallery',
    closeControl: '.project-nav-close',
    description: '.project-description',
    selector: '.project-selector',
    gallery: '.project-gallery',
    wrapper: '.gallery-wrapper',
    nav: '.project-nav',
    images: '.image'
  },

  setup: function () {
    this.inview = this.addChild(this.el, Stump.InView);
    this.gallery = this.addChild(this.$el, Stump.GalleryView);
    this.gallery.casestudy = this;
    
    this.listenOnce(this.inview, 'inview', function() {
      this.images = this.addChild(this.ui.images, Stump.ImageView);
      this.listenTo(this.ui.images, 'click', _.bind(this.expand, this));
      this.inview.destroy();
    });

    this.listenTo(this.ui.infoControl, 'click', _.bind(this.collapse, this));
    this.listenTo(this.ui.galleryControl, 'click', _.bind(this.controlExpand, this));
    this.listenTo(this.ui.closeControl, 'click', _.bind(this.collapse, this));
    this.listenTo(app.window, 'resize', this.resize);
    this.listenTo(app.window, 'scroll', this.resize);
  },

  collapse: function() {
    this.tempState('animating', true);
    this.tempState('collapsing', true);
    this.state('expanded', false);
    this.trigger('collapse');

    clearTimeout(this.collapseTimer);
    this.collapseTimer = _.delay(function(self) {
      self.tempState('animating', true);
      $(window).resize();
    }, 500, this);
  },

  expand: function() {
    clearTimeout(this.collapseTimer);
    this.tempState('animating', true);
    this.state('expanded', true);
    this.trigger('expand');
  },

  controlExpand: function() {
    this.expand();

    _.defer(function(self) {
      if (self.gallery.images.length === 0) {
        self.gallery.setActive(0);
      }
    }, this);
  },

  tempState: function(name, state, timeout) {
    this.state(name, state);
    _.delay(function(self) { 
      self.state(name, !state);
    }, timeout || 500, this);
  },

  resize: function(size) {
    var dH = this.ui.description.outerHeight(),
      sH = this.ui.selector.outerHeight(),
      max = _.max([this.ui.description.height(), this.ui.selector.height()]);

    this.lastHeight = this.minHeight;
    this.minHeight = (size.width > 600 ? max : dH + sH) + (0.1 * size.width);
    this.$el.attr('data-min', this.minHeight);

    this.$el.attr('data-max', size.height);
    // var useable = this.$el.height() - this.ui.nav.outerHeight(true);
    // this.ui.wrapper.css('height', useable);
  }
});
