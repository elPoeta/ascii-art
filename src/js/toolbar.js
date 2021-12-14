
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
       <input type="color" id="color" name="color" value="#000000" >
      <button id="toAscii">Ascii</button>
      <button id="contrast">Contrast</button>
      <button id="save">Save</button>
      `)
  }

  addListeners() {
    this.inputFileBtn = document.querySelector('#inputFile');
    this.inputColorBtn = document.querySelector('#color');
    this.toAsciiBtn = document.querySelector('#toAscii');
    this.contrastBtn = document.querySelector('#contrast');
    this.saveBtn = document.querySelector('#save');
    this.inputFileBtn.addEventListener('change', this.handleOpenFile.bind(this));
    this.inputColorBtn.addEventListener('change', this.handleColor.bind(this));
    this.toAsciiBtn.addEventListener('click', this.handleToAscii.bind(this));
    this.contrastBtn.addEventListener('click', this.handleContrast.bind(this));
    this.saveBtn.addEventListener('click', this.handleSave.bind(this));
  }

  handleOpenFile(e) {
    if (!e.target.files.length && !this.isValidFile(e.target.files[0])) return;
    const image = e.target.files[0];
    const fielName = e.target.files[0].name;
    const url = window.URL || window.webkitURL;
    const img = new Image();
    img.src = url.createObjectURL(image);
    img.onload = () => {
      this.app.createCanvas(img, fielName);
    };

  }

  isValidFile(file) {
    return this.isValidMimeType(file.type);
  }

  isValidMimeType(mimeType) {
    const mimetypes = /image\/png|image\/jpeg|image\/jpg|image\/bmp|imagesvg\+xml|image\/gif|image\/svg\+xml/;
    return mimetypes.test(mimeType);
  }

  handleColor(e) {
    this.app.changeColor(e.target.value);
  }

  handleToAscii(e) {
    this.app.convertoAscii();
  }

  handleContrast(e) {
    this.app.contrast();
  }

  handleSave(e) {
    this.app.save();
  }
}

export default Toolbar