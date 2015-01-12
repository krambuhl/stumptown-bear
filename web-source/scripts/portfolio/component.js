var Treaty = require('treaty');
var Kondico = require('kondico');

var MB = require('../box/mb-const.js');
var IndexComponent = require('./index.js');
var PageComponent = require('./page.js');

var isRoutePage = Kondico.not(isIndex);
var isRouteIndex = Kondico(function(data, msg) { 
  return _.contains(['', 'index'], data.id);
});


module.exports = Treaty.Component.extend({
  box: require('../box/message-box.js'),
  template: Treaty.template('portfolio'),

  ui: {
    $container: '.l-portfolio-container'
  },

  setup: function() {
    this.state(MB.ROUTE).enter(isIndex, function() {
      comp.section = new IndexComponent(comp.$container);
    }).exit(isIndex, function() {
      comp.section.destroy();
    });

    this.state(MB.ROUTE).enter(isIndex, function() {
      comp.section = new PageComponent(comp.$container);
    }).exit(isIndex, function() {
      comp.section.destroy();
    });
  },

  cleanup: function() {
    if (this.section) {
      this.section.destroy();
    }
  }
});