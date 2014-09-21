Stump.ImageView = Patchbay.View.extend({
  setup: function() {
    this.debounce = 250 || this.options.debounce;
    this.src = this.$el.attr('data-src');

    this.listenTo(app.window, 'resize', this.resize);
    
    this.setupPreloader();
    this.preloadImage();
  }, 

  setupPreloader: function() {
    this.ui.preloader = $(document.createElement('div')).addClass('image-preloader');
    this.spinner = new Spinner({
      lines: 17,
      length: 7,
      width: 2,
      radius: 15,
      corners: 0,
      color: '#222',
      speed: 1.2,
      trail: 10,
      hwaccel: true
    }).spin();

    this.ui.preloader.append(this.spinner.el);
    this.$el.append(this.ui.preloader);
  },

  preloadImage: function() {
    var self = this;
    var callback = _.debounce(function() {
      self.srcHeight = this.height;
      self.srcidth = this.width;
      self.ratio = this.height / this.width;

      self.state('loaded', true);
      self.trigger('loaded', true);
      self.$el.css('background-image', 'url(' +  self.src + ')');

      self.resize();

      _.delay(function() {
        self.spinner.stop();
        self.ui.preloader.remove();
      }, 500);
    }, this.debounce);

    this.image = new Image();
    this.image.onabort = callback;
    this.image.onerror = callback;
    this.image.onload = callback;
    this.image.src = this.src;
  },

  resize: function() {
    if(!this.$el.hasClass('image-square')) {
      this.$el.css('padding-top', this.ratio * 100 + '%');
    }
  }
});