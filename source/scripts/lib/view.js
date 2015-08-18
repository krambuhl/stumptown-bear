class View {
  constructor(opts) {
    this.options = opts;

    if (opts.el) this.setupElement(opts.el)
    if (opts.ui) this.setupUI(opts.ui);
    if (opts.events) this.setupEvents(opts.events);

    this.setup();
  }

  setup() {}

  setupElement(el) {
    this.el = el instanceof Element ? el : document.querySelector(el);
  }

  setupUI(ui) {
    this._ui = ui;
    this.ui = Object.keys(ui).map(key => {
      var els = this.el.querySelectorAll(ui[key]);
      return els.length > 1 ? els : els[0];
    });
  }

  setupEvents(ev) {
    this._events = ev;
    Object.keys(ev).forEach(function() { });
  }
}

View.extend = require('simple-extend')

export default View;