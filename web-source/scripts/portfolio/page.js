var Treaty = require('treaty');
var Kondico = require('kondico');

var PortfolioStore = require('./store.js');

module.exports = Treaty.Component.extend({
  box: require('../box/message-box.js'),
  store: PortfolioStore,
  template: Treaty.template('portfolio.page'),
  
  ui: {
    $wrapper: '.l-portfolio',
    $container: '.l-portfolio-container'
  },

  setup: function() {
    // this.store.change('')
  },

  cleanup: function() {
  }
});