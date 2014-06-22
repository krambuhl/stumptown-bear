var $ = require('jquery');
var _ = require('lodash');
var Struck = require('struck');
var fastclick = require('fastclick');


var Cell = require('./modules/cell.js');
var Switch = require('./modules/switch.js');
var Field = require('./modules/field.js');

var App = Struck.View.extend({
  el: '#application',

  ui: {
    cells: '.cell',
    switches: '.switch',
    fields: '.fields'
  },

  setup: function () {
    this.setupFastClick();
    this.setupViewportUnits();
    this.setupCells();
    this.setupSwitches();
  },

  setupFastClick: function () {
    fastclick(document.body);
  },

  setupViewportUnits: function () {
    // require('viewport-units-buggyfill').init();
  },

  setupCells: function () {
    this.cells = _.map(this.ui.cells, function (cell) {
      return new Cell({ el: cell });
    }, this);
  },

  setupSwitches: function () {
    this.switches = _.map(this.ui.switches, function(aswitch) {
      return new Switch({ el: aswitch });
    }, this);
  }
});

$(function() {
  window.app = new App();
});
