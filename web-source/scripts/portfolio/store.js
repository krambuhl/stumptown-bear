var Treaty = require('treaty');

var Store = Treaty.Store.extend({
  box: require('../box/message-box.js'),
  setup: function() {
    // this.state();
  }
});

module.exports = new Store();
