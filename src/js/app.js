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

  createCanvas(img, fileName) {
    const oldCanvas = document.getElementsByTagName('canvas')[0];
    if (oldCanvas)
      oldCanvas.remove();
    this.canvas = new Canvas(img, fileName, 'workspace');
    this.canvas.draw();
  }

  convertoAscii() {
    if (!this.canvas) return;
    this.canvas.ascii();
  }

  changeColor(color) {
    if (!this.canvas) return;
    color = color || '#000000';
    this.canvas.setColor(color);
  }

  contrast() {
    if (!this.canvas) return;
    this.canvas.contrast();
  }

  save() {
    if (!this.canvas) return;
    this.canvas.saveToPng();
  }
}

export default App;
