var Treaty = require('treaty');

var MB = require('./box/mb-const.js');
var Box = require('./box/message-box.js');
var StumpApp = require('./app.js');

// register `STB` export
// window.STB on brower
// module.exports on server
Treaty.register('STB', new StumpApp('#application'));

// behavior specific to server
Treaty.server(function() {
  // http server req
});

// behavior specific to browser
Treaty.browser(function() {
  $(window).on('hashchange', function(ev) {
    Box.update(MB.ROUTE, { hash: ev.hash });
  });
});