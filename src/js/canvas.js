class Canvas {
  constructor(img, fileName, workspaceSelector) {
    this.image = img;
    this.fileName = fileName;
    this.workspace = document.querySelector(`#${workspaceSelector}`);
    this.color = document.querySelector("#color").value;
  }

  draw() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.drawImage(this.image, 0, 0);
    this.workspace.appendChild(this.canvas);
  }

  getColor() {
    return this.color;
  }

  setColor(color) {
    this.color = color;
  }

  toGrayScale(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  rgbaToGray() {
    if (!this.image) return;
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const grayScale = this.toGrayScale(r, g, b);
      imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale;
    }
    this.ctx.putImageData(imageData, 0, 0);
  };

  dataToRgba(imgData) {
    const r = [];
    const g = [];
    const b = [];
    const a = [];
    for (let i = 0, end = imgData.data.length; i < end; i += 4) {
      r.push(imgData.data[i]);
      g.push(imgData.data[i + 1]);
      b.push(imgData.data[i + 2]);
      a.push(imgData.data[i + 3]);
    }
    return { r, g, b, a, w: imgData.width, h: imgData.height };
  }

  rgbaToData(imgData) {
    const img = new ImageData(imgData.w, imgData.h);
    for (let i = 0, j = 0; i < img.data.length - 3; i += 4, j++) {
      img.data[i] = imgData.r[j];
      img.data[i + 1] = imgData.g[j];
      img.data[i + 2] = imgData.b[j];
      img.data[i + 3] = imgData.a[j];
    }
    return img;
  }

  contrast() {
    if (!this.image) return;
    const data = this.dataToRgba(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
    const increaseContrast = colorData => {
      let black = 255, white = 0;
      for (let i = 0; i < colorData.length; i++) {
        if (colorData[i] < black) {
          black = colorData[i];
        }
        if (colorData[i] > white) {
          white = colorData[i];
        }
      }
      for (let i = 0; i < colorData.length; i++) {
        colorData[i] = (colorData[i] - black) / (white - black) * 255;
      }
      return colorData;
    }
    data.r = increaseContrast(data.r);
    data.g = increaseContrast(data.g);
    data.b = increaseContrast(data.b);
    this.ctx.putImageData(this.rgbaToData(data), 0, 0);
  }

  ascii() {
    if (!this.image) return;
    this.rgbaToGray();
    const data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const chars = ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "];
    const grayStep = Math.ceil(255 / chars.length);
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "6px monospace, Courier";
    this.ctx.fillStyle = this.getColor();
    for (let i = 0; i < this.canvas.height * 4; i += 4) {
      for (let j = 0; j < this.canvas.width * 4; j += 4) {
        for (let x = 0; x < chars.length; x++) {
          if (data.data[(i * this.canvas.width + j) * 4] < (x * grayStep) + grayStep) {
            this.ctx.fillText(chars[x], j, i);
            break;
          }
        }
      }
    }
  }

  saveToPng() {
    if (!this.image) return;
    this.canvas.toBlob(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = this.fileName.substring(0, this.fileName.length - 4).replace('.', '') + '-ASCII.png';
      link.click();
    });
  }

}

export default Canvas;