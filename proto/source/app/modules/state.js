var $ = require('jquery');
var Struck = require('struck');

module.exports = Struck.View.extend({
	ui: {
		controls: '.state-control',
		sections: '.state-section'
	},

	setup: function () {
		var self = this;

		this.scopeUI();

		this.ui.controls.on('click', function (ev) {
			self.setState($(this).attr('data-state'));
		});

		var name = this.$el.attr('data-state') || "default";
		this.setState(name);
	},

	scopeUI: function () {
		var stateId = this.$el.attr('data-state-id');
		if (stateId !== undefined) {
			this.ui.controls =
				this.ui.controls.filter('[data-state-id="' + stateId + '"]');

			this.ui.sections =
				this.ui.sections.filter('[data-state-id="' + stateId + '"]');
		}
	},

	setState: function (name) {
		var filter = '[data-state="' + name + '"]';

		this.$el.attr('data-state', name);

		this.ui.controls.removeClass('is-active')
			.filter(filter).addClass('is-active');

		this.ui.sections.removeClass('is-active')
			.filter(filter).addClass('is-active');
	}
});
