var $ = require('jquery');
var Struck = require('struck');

module.exports = Struck.View.extend({
	ui: {
		controls: '.switch-control',
		contents: '.switch-content'
	},

	setup: function () {
		var self = this;

		this.scopeUI();

		this.ui.controls.on('click', function (ev) {
			var $this = $(this),
				state = $this.attr('data-switchto') || $this.attr('data-switch');
			self.setState(state);
		});

		var name = this.$el.attr('data-switch') || "default";
		this.setState(name);
	},

	scopeUI: function () {
		var stateId = this.$el.attr('data-switch-id');
		if (stateId !== undefined) {
			this.ui.controls =
				this.ui.controls.filter('[data-switch-id="' + stateId + '"]');

			this.ui.contents =
				this.ui.contents.filter('[data-switch-id="' + stateId + '"]');
		}
	},

	setState: function (name) {
		var filter = '[data-switch="' + name + '"]';

		this.$el.attr('data-switch', name);

		this.ui.controls.removeClass('is-active')
			.filter(filter).addClass('is-active');

		this.ui.contents.removeClass('is-active')
			.filter(filter).addClass('is-active');
	}
});
