import Statum from 'statum';

export default class {
  constructor() {
    this.top = new Statum(function() {
      return window.scrollY;
    });

    this.width = new Statum(function() {
      return window.innerWidth;
    });

    var _update = function() {
      this.top.refresh();
      this.width.refresh();
    }.bind(this);

    window.addEventListener('scroll', _update);
    window.addEventListener('resize', _update);
  }
}