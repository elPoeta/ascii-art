import Toolbar from "./toolbar.js";
import Canvas from "./canvas.js";
class App {
  constructor() {
    this.mainTag = document.querySelector('#main');
    this.toolbar = null;
  }

  render() {
    this.mainTag.innerHTML = this.template();
    this.init();
    return this;
  }

  template() {
    return (
      `<header><h1>Ascii Art</h1></header>
      <section id="toolbar"></section>
      <section id="workspace"></section>`
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
    const canvas = new Canvas(img, 'workspace');
    canvas.draw();
  }
}

export default App;
