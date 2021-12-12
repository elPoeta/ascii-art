document.querySelector('#imageFile').addEventListener('change', e => {
  open(e);
});
function open(e) {
  if (e.target.files[0]) {
    image = e.target.files[0];
    let url = window.URL || window.webkitURL;
    let img = new Image();
    img.src = url.createObjectURL(image);
    img.onload = function () {
      originalImg = this;
      draw(img);
    };
  }
}

function draw(img) {
  canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  c = canvas.getContext('2d');
  c.drawImage(img, 0, 0);
  let oldCanvas = document.getElementsByTagName('canvas')[0];
  if (oldCanvas)
    oldCanvas.remove();
  document.querySelector('#workspace').appendChild(canvas);
}