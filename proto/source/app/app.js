var $ = require('jquery');
var _ = require('lodash');
var Struck = require('struck');
var fastclick = require('fastclick');

var Cell = require('./cell.js');


var App = Struck.View.extend({
  el: '#application',

  ui: {
    cells: '.cell'
  },

  setup: function () {
    this.setupGrunticon();
    this.setupFastClick();
    this.setupViewportUnits();
    this.setupCells();
  },

  setupGrunticon: function () {
    grunticon([
      "svg/icons.data.svg.css",
      "svg/icons.data.png.css",
      "svg/icons.fallback.css"
    ]);
  },

  setupFastClick: function () {
    fastclick(document.body);
  },

  setupViewportUnits: function () {
    require('viewport-units-buggyfill').init();
  },

  setupCells: function () {
    this.cells = _.reduce(this.ui.cells, function (cells, cell) {
      cells.push(new Cell({ el: cell }));
      return cells;
    }, [], this);
  }
});

$(function() {
  window.app = new App();
});
