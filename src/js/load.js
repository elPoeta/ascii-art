class Load {

  static start() {
    const div = document.createElement('div');
    div.setAttribute('id', 'working');
    div.setAttribute('class', 'working');
    div.innerHTML = Load.template();
    document.querySelector('body').appendChild(div);
    document.querySelector('#loadtext').innerHTML = i18next.t('toolbar.working');
  }

  static template() {
    return (
      `<div class="container-gear">
    <div class="gearbox">
    <div class="overlay-gear"></div>
      <div class="gear one">
        <div class="gear-inner">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
      <div class="gear two">
        <div class="gear-inner">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
      <div class="gear three">
        <div class="gear-inner">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
      <div class="gear four large">
        <div class="gear-inner">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
    </div>
    <h3 id="loadtext" data-i18n="toolbar.working">Working...</h3>
  </div>`);
  }

  static finish() {
    document.querySelector('#working').remove();
  }

}

export default Load;