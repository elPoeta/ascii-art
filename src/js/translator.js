class Translator {
  constructor() {
    this.langs = ["en", "es"];
    this.currentLang = 'en';
    this.langSelector = document.querySelector("#language");
    this.langSelector.addEventListener('click', this.handleChangeLanguge.bind(this));
  }

  updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const k = element.getAttribute("data-i18n");
      element.innerHTML = i18next.t(k);
    }
  }

  async i18Loader() {
    const jsons = await Promise.all(
      this.langs.map((l) => fetch("src/locales/" + l + ".json").then((r) => r.json()))
    );
    const res = this.langs.reduce((acc, l, idx) => {
      acc[l] = { translation: jsons[idx] };
      return acc;
    }, {});
    await i18next.init({
      lng: "en",
      debug: true,
      resources: res
    });
    this.updateContent();
    i18next.on("languageChanged", () => {
      this.updateContent();
    });
  }

  handleChangeLanguge(e) {
    this.currentLang = this.currentLang === 'en' ? 'es' : 'en'
    i18next.changeLanguage(this.currentLang);
  }

}

export default Translator