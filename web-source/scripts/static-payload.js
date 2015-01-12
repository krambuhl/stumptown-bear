// server can kick start static
// html with payload data
var MB = require('./box/mb-const.js');
var Box = require('./box/message-box.js');

Box.update(MB.ROUTE, {
  hash: 'portfolio/ca-portfolio'
}, { payload: true }); 