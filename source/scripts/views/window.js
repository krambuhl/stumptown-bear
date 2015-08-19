import View from '../lib/view.js';
import Statum from 'statum';

export default View.extend({
  events: {
    'scroll @el': '_updateScroll',
    'resize @el': '_updateWidth'
  },

  beforeSetup() {
    this.scrollTop = new Statum(function() {
      return window.scrollY;
    });

    this.width = new Statum(function() {
      return window.innerWidth;
    });
  },

  _updateScroll() { this.scrollTop.refresh(); },
  _updateWidth() { this.width.refresh(); }
});