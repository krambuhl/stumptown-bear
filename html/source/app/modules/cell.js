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
