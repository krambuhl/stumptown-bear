import domready from 'domready';

import app from './app.js';
import WindowView from './views/window.js';

domready(() => {
  app.window = new WindowView();
});


window.app = app;