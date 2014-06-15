var $ = require('jquery');
var Struck = require('struck');
var fastclick = require('fastclick');


var App = Struck.View.extend({
  el: '#application',

  ui: {

  },

  setup: function () {
    this.setupFastClick();
  },

  setupFastClick: function () {
    fastclick(document.body);
  }
});

$(function() {
  window.app = new App();
});
