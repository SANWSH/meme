import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUS from "../public/locales/enUS.json";
import ruRU from "../public/locales/ruRU.json";


const resources = {
    en: { translation: enUS },
    ru: {translation: ruRU},
}

i18n.use(initReactI18next)
.init({
    resources,
    lng: "ru",
})

