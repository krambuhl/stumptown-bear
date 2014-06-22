var $ = require('jquery');
var Struck = require('struck');

module.exports = Struck.View.extend({
	setup: function () {
		var data = { self: this };
		$(window).on('resize', data, this.resizeCell).trigger('resize');
	},

	resizeCell: function (ev) {
		var el = ev.data.self.$el;
		if (el.hasClass('cell-full')) {
			el.css('min-height', window.innerHeight);
		}
	}
});
