var Stump = function() {};

//=include('modules/window.js')
//=include('modules/cell.js')
//=include('modules/image.js')
//=include('modules/casestudy.js')
//=include('modules/inview.js')
//=include('modules/gallery.js')

Stump.Application = Patchbay.View.extend({
  el: '#application',

  ui: {
    cells: '.cell',
    casestudies: '.project-casestudy'
  },

  setup: function() {
    this.state('starting', true);
    _.delay(_.bind(this.state, this), 250, 'starting', false);
    
    this.window = Stump.WindowView.create();

    // this.setupCells();
    this.setupChildren();
  },

  setupChildren: function() {
    // this.scroller = Seven.AppScrollerView.create({ el: this.ui.content });
    // this.header = Seven.HeaderView.create({ el: this.ui.header });

    this.setupPage();

    this.cells = this.addChild(this.ui.cells, Stump.CellView);
    this.casestudies = this.addChild(this.ui.casestudies, Stump.CasestudyView);
  },

  setupPage: function() {
    // if (this.ui.article.length > 0) {
    //   this.article = Seven.ArticleView.create({ el: this.ui.article });
    // }
  }
});

//=include('startup.js')