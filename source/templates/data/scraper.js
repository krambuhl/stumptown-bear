var config = require('./config.json');
var request = require('request');
var map = require('map-async');
var fs = require('fs');

map(config, function(item, done) {
  var tmpl = 'https://raw.githubusercontent.com/krambuhl/$0/master/package.json';
  request(tmpl.replace('$0', item), function(err, response, html) {
    done(err, JSON.parse(html));
  });
}, function(err, res) {
  fs.writeFile('./packages.json', JSON.stringify(res));
})