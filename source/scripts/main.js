// import App from './modules/app.js';
// import dom from 'domquery';
import domready from 'domready';

var w = window;
var d = document;

domready(() => {
  var nav = d.getElementsByClass('l-mast-nav')[0];
  var portfolio = nav.getElementsByClass('m-portfolio')[0];
  var code = nav.getElementsByClass('m-code')[0];
  var content = nav.getElementsByClass('m-content')[0];
});