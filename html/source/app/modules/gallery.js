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
    this.position = 0;

    this.getImages();

    this.hammer = new Hammer(this.ui.wrapper[0]);
    this.hammer
      .on('dragstart', _.bind(this.dragStart, this))
      .on('drag', _.bind(this.dragMove, this))
      .on('dragend', _.bind(this.dragEnd, this));

    this.listenTo(app.window, 'resize', this.resize);
    this.listenTo(this.ui.selectors, 'click', _.bind(this.onItemClick, this));

    this.listenTo(this, 'drag:left', this.prev);
    this.listenTo(this, 'drag:right', this.next);
  },

  afterSetup: function() {
    this.listenTo(this.casestudy, 'expand', function() {
      this.expanded = true;
      this.oldScroll = $('body').scrollTop();
      $('body').animate({ 'scrollTop': this.$el.offset().top }, 500);

      this.resize(app.window.data);
    });

    this.listenTo(this.casestudy, 'collapse', function() {
      this.expanded = false;
      this.resize(app.window.data);
    });

    _.delay(function(self) {
      self.resize(app.window.data);
    }, 250, this);
  },

  dragStart: function() {
    this.delta = 0;
    this.trigger('drag:start');
    this.state('dragging', true);
    this.startPosition = this.position;
  },

  dragMove: function(ev) {
    this.lastDelta = this.delta;
    this.delta = ev.gesture.deltaX;
    this.position = this.startPosition + ev.gesture.deltaX;
    this.offset = this.position + this.wrapperWidth * this.elIndex;

    this.trigger('drag');
    this.updateDirection();
    this.positionElements(this.offset);
  },

  dragEnd: function() {
    this.trigger('drag:end');
    this.state('dragging', false);
    this.tempState('animating', true);
    // this.positionElements(Math.round(this.position / this.wrapperWidth) * this.wrapperWidth);
    // this.position = this.startPosition + ev.gesture.deltaX;
  },

  updateDirection: _.throttle(function() {
    this.lastDirection = this.direction;
    this.direction = this.delta < this.lastDelta ? 'left' : 'right';
    
    if (this.lastDirection !== this.direction) {
      this.changeDirection(this.direction);
    }

  }, 50),

  changeDirection: function(direction) {
    this.trigger('drag:' + direction);
  },

  positionElements: function(offset) {
    var self = this;
    this.ui.items.each(function(index) {
      var translate = (self.wrapperWidth * index + offset);
      $(this).css('transform', 'translate3d(' + translate + 'px, 0, 0)');
    });
  },

  cleanupElements: function() {

  },

  onItemClick: function(ev) {
    var index = $(ev.currentTarget).attr('data-index');
    this.setActive(parseInt(index));
  },

  resize: function(size) {
    var height, offset;
    if (!this.state('expanded')) {
      height = this.$el.attr('data-min');
    } else {
      offset = size.width > 600 ? 0 : size.width * 0.1;
      height = size.height + offset;
    }

    this.wrapperWidth = this.ui.wrapper.innerWidth() * 1.025;

    this.$el.css('height', height);
    this.setImagesOffset(size);

    this.positionElements(this.offset);
  },

  setActive: function(index) {
    this.lastIndex = this.index;
    this.index = index;
    this.addImage(index);

    this.elIndex = this.ui.items.filter('[data-index=' + index + ']').index();

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

  cleanup: function() {
    _.each(this.images, function(image) {
      image.destroy();
    });
  },

  tempState: function(name, state, timeout) {
    this.state(name, state);
    _.delay(function(self) { 
      self.state(name, !state);
    }, timeout || 500, this);
  }
});
