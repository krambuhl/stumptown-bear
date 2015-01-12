var Treaty = require('treaty');
var Kondico = require('kondico');

var MB = require('./box/mb-const.js');
var PortfolioComponent = require('./portfolio.js');

var isRouteHome = function(data) { return _.contains(['', 'home'], hash.section); };
var isRoutePortfolio = function(data) { return hash.section === 'portfolio'; };
var isRouteCode = function(data) { return hash.section === 'code'; };
var isRouteBlog = function(data) { return hash.section === 'blog'; };
var isRouteUnknown = Kondico.nor(isHome, isPortfolio, isCode, isBlog);

module.exports = Treaty.Component.extend({
  box: require('./box/message-box.js'),
  template: Treaty.Template('application'),

  ui: {
    $wrapper: '.l-app',
    $container: '.l-app-container'
  },

  setup: function() {
    this.setupState(isRouteHome, HomeComponent);
    this.setupState(isRoutePortfolio, PortfolioComponent);
    this.setupState(isRouteCode, CodeComponent);
    this.setupState(isRouteBlog, BlogComponent);
    this.setupState(isRouteUnknown, UnknownSectionComponent);
  },

  setupState: function(state, Component) {    
    this.state(MB.ROUTE).enter(state, function() {
      comp.section = new Component(comp.$container);
    }).exit(state, function() {
      comp.section.destroy();
    });
  },

  cleanup: function() {
    if (this.section) {
      this.section.destroy();
    }
  }
});