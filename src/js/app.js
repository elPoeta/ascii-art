import Toolbar from "./toolbar.js";
import Canvas from "./canvas.js";
class App {
  constructor() {
    this.mainTag = document.querySelector('#main');
    this.toolbar = null;
    this.canvas = null;
  }

  render() {
    this.mainTag.innerHTML = this.template();
    this.init();
    return this;
  }

  template() {
    return (
      `<header><h1>Ascii Art</h1></header>
      <section id="toolbar" class="toolbar"></section>
      <section id="workspace" class="workspace"></section>`
    );
  }

  init() {
    this.createToolbar();
  }

  createToolbar() {
    this.toolbar = new Toolbar(this, 'toolbar');
    this.toolbar.render();
  }

  createCanvas(img) {
    const oldCanvas = document.getElementsByTagName('canvas')[0];
    if (oldCanvas)
      oldCanvas.remove();
    this.canvas = new Canvas(img, 'workspace');
    this.canvas.draw();
  }

  convertoAscii() {
    if (!this.canvas) return;
    this.canvas.ascii();
  }
}

export default App;
