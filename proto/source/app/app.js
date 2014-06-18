var $ = require('jquery');
var _ = require('lodash');
var Struck = require('struck');
var fastclick = require('fastclick');


var Cell = require('./modules/cell.js');
var State = require('./modules/state.js');
var Field = require('./modules/field.js');

var App = Struck.View.extend({
  el: '#application',

  ui: {
    cells: '.cell',
    states: '.state',
    fields: '.fields'
  },

  setup: function () {
    this.setupGrunticon();
    this.setupFastClick();
    this.setupViewportUnits();
    this.setupCells();
    this.setupStateModules();
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
    this.cells = _.map(this.ui.cells, function (cell) {
      return new Cell({ el: cell });
    }, this);
  },

  setupStateModules: function () {
    this.stateModules =_.map(this.ui.states, function (state) {
      return new State({ el: state });
    }, this);
  }
});

$(function() {
  window.app = new App();
});
