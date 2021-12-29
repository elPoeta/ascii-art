import App from "./app.js";
import Translator from "./translator.js";

new App().render();
const translator = new Translator();
translator.i18Loader();
