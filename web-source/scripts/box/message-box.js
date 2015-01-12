var MB = require('./mb-const.js');

var parseHash = function(hash) {
  var blocks = _.chain(hash).split('/').unique().value();
  if (!blocks.length) { return ['']; }
  return blocks;
};

module.exports = new Treaty.MessageBox({
  setup: function() {
    this.config(MB.ROUTE, {
      transform: function(data) {
        data.frags = parseHash(data.hash);
        data.section = data.frags[0];
        data.id = data.frags[1] || '';
        return data;
      }
    });
  }
});