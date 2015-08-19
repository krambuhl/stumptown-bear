import extend from 'extend';
import pick from 'lodash.pick';
import Delegate from 'dom-delegate';
import objpath from 'get-object-path';

export default View;

function View(opts) {
  this.options = opts || {};

  extend(this, pick(this.options, View.extKeys));
  
  // cono
  this.beforeSetup();

  if (this.el) this.setElement(this.el)
  if (this.events) this.setupEvents(this.events);
  if (this.ui) this.setupUI(this.ui);

  this.setup();
}

View.extKeys = ['el', 'ui', 'events'];
View.extend = require('simple-extend');

View.prototype = {
  beforeSetup() {},
  setup() {},

  setElement(el) {
    var flag = el.addEventListener !== undefined;
    this.el = flag ? el : document.querySelector(el);
  },

  setupUI(ui) {
    this._ui = ui;
    this.ui = Object.keys(ui).reduce((memo, key) => {
      var els = this.el.querySelectorAll(ui[key]);
      memo[key] = els.length > 1 ? els : els[0];
      return memo;
    }, {});
  },

  setupEvents(events) {
    this.delegate = new Delegate(this.el);

    var self = this;
    Object.keys(events).forEach(parseEvent);

    function parseEvent(ev) {
      var e = parseEventKey(self, ev),
        callback = parseEventValue(self, events[ev]);

      if (typeof e.target === 'string') {
        delegate.on(e.events, e.target, cb);
      } else {
        e.target.addEventListener(e.events, cb);
      }

      function cb() {
        callback.apply(self, arguments);
      }
    }
  },

  cleanup() {
    this.beforeCleanup();
    this.cleanupEvents(this.events);
    this.afterCleanup();
  },

  beforeCleanup() {},
  afterCleanup() {},

  cleanupEvents(ev) {
    var self = this;

    Object.keys(events).forEach(parseEvent);

    function parseEvent(ev) {
      var e = parseEventKey(self, ev);
      if (typeof e.target === 'string') {
        delegate.off(e.events, e.target);
      } else {
        e.target.removeEventListener(e.events);
      }
    }
  }
}

function parseEventKey(self, ev) {
  var parts = ev.split(' ');

  return {
    target: parseEventPath(self, parts.pop().trim()),
    events: parts.join(' ').trim()
  };
}

function parseEventPath(self, path) {
  var t = path;
  
  if (path.indexOf('@') === 0) {
    t = objpath(self, path.substr(1))
  }

  return t;
}

function parseEventValue(self, val) {
  return typeof val === 'string' ? 
    objpath(self, val) : val;
}