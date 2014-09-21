var Stump = function() {};

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
      width: this.el.innerWidth,
      height: this.el.innerHeight,
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
Stump.CellView = Patchbay.View.extend({
  setup: function () {
    this.listenTo(app.window, 'resize', this.resize);
    this.resize();
  },

  resize: function () {
    if (this.$el.hasClass('cell-full')) {
      this.$el.css('min-height', window.innerHeight);
    }
  }
});

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

Stump.InView = Patchbay.View.extend({
  setup: function () {
    var self = this;
    this.measure = _.wrap(this.measure, function(func) {
      func.apply(this, _.rest(arguments).concat([self.uid]));
    });

    this.callback = _.bind(function() {
      this.measure(app.window.data);
    }, this);

    $(window).on('scroll resize', this.callback);
    this.callback();
  },

  measure: function(ev) {
    this.height = this.$el.outerHeight();
    this.top = this.$el.offset().top;
    this.bottom = this.top + this.height;

    this.inTop = this.bottom > ev.scrollTop;
    this.inBottom = this.top < ev.scrollBottom;
    this.inView = this.inTop && this.inBottom;

    this.inviewState(this.inView);
  },

  inviewState: function(state) {
    this.state('inview', state);

    if (state) {
      this.trigger('inview', _.pick(this, 'height', 'top', 'bottom', 'inTop', 'inBottom', 'inView'));
    }
  },

  cleanup: function() {
    $(window).off('scroll', this.callback);
    $(window).off('resize', this.callback);
  }
});

Stump.GalleryView = Patchbay.View.extend({
  ui: {
    selectors: '.gallery-selector',
    wrapper: '.gallery-wrapper',
    items: '.gallery-item'
  },

  setup: function () {
    this.itemTemplate = _.template('<div class="gallery-item" data-index="<%= index %>"><div class="image" data-src="<%= src %>"></div></div>');
    this.images = [];
    this.addedImages = [];
    this.getImages();

    this.hammer = new Hammer(this.ui.wrapper[0]);
    this.hammer
      .on('dragstart', _.bind(this.dragStart, this))
      .on('drag', _.bind(this.dragMove, this))
      .on('dragend', _.bind(this.dragEnd, this));

    this.listenTo(app.window, 'resize', this.resize);
    this.listenTo(this.ui.selectors, 'click', _.bind(this.onItemClick, this));
  },

  dragStart: function() {},
  dragMove: function() {},
  dragEnd: function() {},

  onItemClick: function(ev) {
    var index = $(ev.currentTarget).attr('data-index');
    this.setActive(parseInt(index));
  },

  resize: function(size) {
    this.setImagesOffset(size);
  },

  setActive: function(index) {
    this.index = index;
    this.addImage(index);

    this.ui.items.removeClass('is-active')
      .filter('[data-index=' + index + ']').addClass('is-active');

    this.ui.selectors.removeClass('is-active')
      .filter('[data-index=' + index + ']').addClass('is-active');
  },

  setImagesOffset: function(size) {
    this.ui.items.each(function() {
      var $this = $(this),
        image = $this.find('.image'),
        offset = 0;

      if (size.width < 600) {
        offset = $this.outerHeight() - image.outerHeight();
        offset = offset / 2;
      }

      $this.css('padding-top', offset);
    });
  },

  getImages: function() {
    this.imageData = this.ui.selectors.map(function(index) {
      var $this = $(this);
      $this.attr('data-index', index);

      return {
        index: index,
        src: $this.attr('data-src')
      };
    }).get();
  },

  addImage: function(index) {
    if (_.indexOf(this.addedImages, index) !== -1) return;

    var data = _.find(this.imageData, function(row) {
      return row.index === index;
    });

    var imageEl = $(this.itemTemplate(data));

    if (this.ui.items.length > 0) {
      var near = _.find(this.ui.items.get().reverse(), function(item) {
        return data.index > $(item).attr('data-index');
      });

      var el = _.isUndefined(near) ? this.ui.items.eq(0) : $(near);
      var method = _.isUndefined(near) ? 'before' : 'after';

      el[method](imageEl);
    } else {
      this.ui.wrapper.append(imageEl);
    }

    this.ui.items = this.$('.gallery-item');
    var imageView = Stump.ImageView.create({ el: imageEl.find('.image') }, { debounce: 1000 });

    this.images.push();
    this.addedImages.push(index);

    $(window).trigger('resize');
    this.listenOnce(imageView, 'loaded', function() {
      $(window).trigger('resize');
    });
  },

  cleanup: function() {
    _.each(this.images, function(image) {
      image.destroy();
    });
  }
});


Stump.Application = Patchbay.View.extend({
  el: '#application',

  ui: {
    cells: '.cell',
    casestudies: '.project-casestudy'
  },

  setup: function() {
    this.state('starting', true);
    _.delay(_.bind(this.state, this), 250, 'starting', false);
    
    this.window = Stump.WindowView.create();

    // this.setupCells();
    this.setupChildren();
  },

  setupChildren: function() {
    // this.scroller = Seven.AppScrollerView.create({ el: this.ui.content });
    // this.header = Seven.HeaderView.create({ el: this.ui.header });

    this.setupPage();

    this.cells = this.addChild(this.ui.cells, Stump.CellView);
    this.casestudies = this.addChild(this.ui.casestudies, Stump.CasestudyView);
  },

  setupPage: function() {
    // if (this.ui.article.length > 0) {
    //   this.article = Seven.ArticleView.create({ el: this.ui.article });
    // }
  }
});

$(function() {
	window.app = new Stump.Application();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXMiOlsiYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBTdHVtcCA9IGZ1bmN0aW9uKCkge307XG5cbi8vPWluY2x1ZGUoJ21vZHVsZXMvd2luZG93LmpzJylcbi8vPWluY2x1ZGUoJ21vZHVsZXMvY2VsbC5qcycpXG4vLz1pbmNsdWRlKCdtb2R1bGVzL2ltYWdlLmpzJylcbi8vPWluY2x1ZGUoJ21vZHVsZXMvY2FzZXN0dWR5LmpzJylcbi8vPWluY2x1ZGUoJ21vZHVsZXMvaW52aWV3LmpzJylcbi8vPWluY2x1ZGUoJ21vZHVsZXMvZ2FsbGVyeS5qcycpXG5cblN0dW1wLkFwcGxpY2F0aW9uID0gUGF0Y2hiYXkuVmlldy5leHRlbmQoe1xuICBlbDogJyNhcHBsaWNhdGlvbicsXG5cbiAgdWk6IHtcbiAgICBjZWxsczogJy5jZWxsJyxcbiAgICBjYXNlc3R1ZGllczogJy5wcm9qZWN0LWNhc2VzdHVkeSdcbiAgfSxcblxuICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdGF0ZSgnc3RhcnRpbmcnLCB0cnVlKTtcbiAgICBfLmRlbGF5KF8uYmluZCh0aGlzLnN0YXRlLCB0aGlzKSwgMjUwLCAnc3RhcnRpbmcnLCBmYWxzZSk7XG4gICAgXG4gICAgdGhpcy53aW5kb3cgPSBTdHVtcC5XaW5kb3dWaWV3LmNyZWF0ZSgpO1xuXG4gICAgLy8gdGhpcy5zZXR1cENlbGxzKCk7XG4gICAgdGhpcy5zZXR1cENoaWxkcmVuKCk7XG4gIH0sXG5cbiAgc2V0dXBDaGlsZHJlbjogZnVuY3Rpb24oKSB7XG4gICAgLy8gdGhpcy5zY3JvbGxlciA9IFNldmVuLkFwcFNjcm9sbGVyVmlldy5jcmVhdGUoeyBlbDogdGhpcy51aS5jb250ZW50IH0pO1xuICAgIC8vIHRoaXMuaGVhZGVyID0gU2V2ZW4uSGVhZGVyVmlldy5jcmVhdGUoeyBlbDogdGhpcy51aS5oZWFkZXIgfSk7XG5cbiAgICB0aGlzLnNldHVwUGFnZSgpO1xuXG4gICAgdGhpcy5jZWxscyA9IHRoaXMuYWRkQ2hpbGQodGhpcy51aS5jZWxscywgU3R1bXAuQ2VsbFZpZXcpO1xuICAgIHRoaXMuY2FzZXN0dWRpZXMgPSB0aGlzLmFkZENoaWxkKHRoaXMudWkuY2FzZXN0dWRpZXMsIFN0dW1wLkNhc2VzdHVkeVZpZXcpO1xuICB9LFxuXG4gIHNldHVwUGFnZTogZnVuY3Rpb24oKSB7XG4gICAgLy8gaWYgKHRoaXMudWkuYXJ0aWNsZS5sZW5ndGggPiAwKSB7XG4gICAgLy8gICB0aGlzLmFydGljbGUgPSBTZXZlbi5BcnRpY2xlVmlldy5jcmVhdGUoeyBlbDogdGhpcy51aS5hcnRpY2xlIH0pO1xuICAgIC8vIH1cbiAgfVxufSk7XG5cbi8vPWluY2x1ZGUoJ3N0YXJ0dXAuanMnKSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==