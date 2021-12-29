import Icon from "./icons.js";
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
      `<nav class="nav">
      <div>
        <div class="fileChoose-wrapper">
           <input type="file" name="inputFile" id="inputFile" accept="image/*">
            ${Icon.getIcon({ name: 'openFolder', id: 'openFile', fill: '#000000', className: 'toolbar-icon' })}
         </div>
        <h6 data-i18n="toolbar.open">Open</h6> 
      </div>
      <div>
        <input type="color" id="color" name="color" value="#000000" >
        <h6 data-i18n="toolbar.color">Color</h6>
      </div>
      <div>
        ${Icon.getIcon({ name: 'ascii', id: 'toAscii', fill: '#000000', className: 'toolbar-icon' })}
        <h6 data-i18n="toolbar.ascii">Convert</h6>  
      </div>
      <div>
        ${Icon.getIcon({ name: 'contrast', id: 'contrast', fill: '#000000', className: 'toolbar-icon' })}
          <h6 data-i18n="toolbar.contrast">Contrast</h6>
      </div>
      <div>
        ${Icon.getIcon({ name: 'save', id: 'save', fill: '#000000', className: 'toolbar-icon' })}
        <h6 data-i18n="toolbar.save">Save</h6>
      </div>
      <div>
        ${Icon.getIcon({ name: 'language', id: 'language', fill: '#000000', className: 'toolbar-icon' })}
        <h6 data-i18n="toolbar.lang">Language</h6>
      </div>
      </nav>`);
  }

  addListeners() {
    this.inputFileBtn = document.querySelector('#inputFile');
    this.openFileBtn = document.querySelector('#openFile');
    this.inputColorBtn = document.querySelector('#color');
    this.toAsciiBtn = document.querySelector('#toAscii');
    this.contrastBtn = document.querySelector('#contrast');
    this.saveBtn = document.querySelector('#save');
    this.openFileBtn.addEventListener('click', this.handleOpenChoose.bind(this));
    this.inputFileBtn.addEventListener('change', this.handleOpenFile.bind(this));
    this.inputColorBtn.addEventListener('change', this.handleColor.bind(this));
    this.toAsciiBtn.addEventListener('click', this.handleToAscii.bind(this));
    this.contrastBtn.addEventListener('click', this.handleContrast.bind(this));
    this.saveBtn.addEventListener('click', this.handleSave.bind(this));
  }

  handleOpenChoose(e) {
    this.inputFileBtn.click(e);
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