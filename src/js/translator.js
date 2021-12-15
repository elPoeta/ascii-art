class Translator {
  constructor() {
    this.langs = ["en", "es"];
    this.langSelector = document.querySelector("#langSelector");
    this.langSelector.removeAttribute("disabled");
    this.langSelector.addEventListener('change', this.handleChangeLanguge.bind(this));
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
    i18next.changeLanguage(e.target.value);
  }

}

export default Translator