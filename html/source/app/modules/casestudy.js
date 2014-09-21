Stump.CasestudyView = Patchbay.View.extend({
  ui: {
    infoControl: '.project-nav-information',
    galleryControl: '.project-nav-gallery',
    closeControl: '.project-nav-close',
    wrapper: '.gallery-wrapper',
    nav: '.project-nav',
    images: '.image'
  },

  setup: function () {
    this.inview = this.addChild(this.el, Stump.InView);
    this.gallery = this.addChild(this.$el, Stump.GalleryView);
    
    this.listenOnce(this.inview, 'inview', function() {
      this.images = this.addChild(this.ui.images, Stump.ImageView);
      this.listenTo(this.ui.images, 'click', _.bind(this.expand, this));
      this.inview.destroy();
    });

    this.listenTo(this.ui.infoControl, 'click', _.bind(this.collapse, this));
    this.listenTo(this.ui.galleryControl, 'click', _.bind(this.expand, this));
    this.listenTo(this.ui.closeControl, 'click', _.bind(this.collapse, this));
    this.listenTo(app.window, 'resize', this.resize);
  },

  collapse: function() {
    this.tempState('animating', true);
    this.state('expanded', false);
  },

  expand: function() {
    this.tempState('animating', true);
    this.state('expanded', true);

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

  resize: function() {
    var useable = this.$el.height() - this.ui.nav.outerHeight(true);
    this.ui.wrapper.css('height', useable);
  }
});
