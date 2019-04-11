require("./assets/loader");
if (!window.Intl) {
    // Safari polyfill
    require.ensure(["intl"], require => {
        window.Intl = require("intl");
        Intl.__addLocaleData(require("./assets/intl-data/en.json"));
        Intl.__addLocaleData(require("./assets/intl-data/ru.json"));
        require("index.js");
    });
} else {
    require("index.js");
}
