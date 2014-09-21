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
