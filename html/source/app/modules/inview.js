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
