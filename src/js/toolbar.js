
class Toolbar {
  constructor(app, toolbarSelector) {
    this.app = app;
    this.toolbarTag = document.querySelector(`#${toolbarSelector}`);
  }

  render() {
    this.toolbarTag.innerHTML = this.template();
    this.addListeners();
  }

  template() {
    return (
      `<input type="file" name="inputFile" id="inputFile" accept="image/*">
      <button id="toAscii">Ascii</button>
      `)
  }

  addListeners() {
    this.inputFile = document.querySelector('#inputFile');
    this.toAscii = document.querySelector('#toAscii');
    this.inputFile.addEventListener('change', this.handleOpenFile.bind(this));
    this.toAscii.addEventListener('click', this.handleToAscii.bind(this));
  }

  handleOpenFile(e) {
    if (!e.target.files.length && !this.isValidFile(e.target.files[0])) return;
    const image = e.target.files[0];
    const url = window.URL || window.webkitURL;
    const img = new Image();
    img.src = url.createObjectURL(image);
    img.onload = () => {
      this.app.createCanvas(img);
    };

  }

  isValidFile(file) {
    return this.isValidMimeType(file.type);
  }

  isValidMimeType(mimeType) {
    const mimetypes = /image\/png|image\/jpeg|image\/jpg|image\/bmp|imagesvg\+xml|image\/gif|image\/svg\+xml/;
    return mimetypes.test(mimeType);
  }

  handleToAscii(e) {
    this.app.convertoAscii();
  }
}

export default Toolbar