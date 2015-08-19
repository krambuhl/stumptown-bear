import domready from 'domready';

import app from './app.js';
import WindowView from './views/window.js';
import MastView from './views/mast.js';

domready(() => {
  app.window = new WindowView({ el: window });
  app.mast = new MastView({ el: '.l-mast' });
});


window.app = app;