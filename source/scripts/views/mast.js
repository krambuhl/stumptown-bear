import Statum from 'statum';
import is from 'functional-predicates';
import View from '../lib/view.js';

import app from '../app.js';

export default View.extend({
  setup: function() {
    app.window.top.change(is.gt(40), res => {
      this.el.classList[res ? 'add' : 'remove']('is-fixed')
    });
  }
})