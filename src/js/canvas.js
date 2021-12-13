class Canvas {
  constructor(img, workspaceSelector) {
    this.image = img;
    this.workspace = document.querySelector(`#${workspaceSelector}`);
  }

  draw() {
    const canvas = document.createElement('canvas');
    canvas.width = this.image.width;
    canvas.height = this.image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.image, 0, 0);
    this.workspace.appendChild(canvas);
  }
}

export default Canvas;