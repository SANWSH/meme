import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUS from "../public/locales/enUS.json";
import ruRU from "../public/locales/ruRU.json";
import ukUA from "../public/locales/ukUA.json";
import beBY from "../public/locales/beBY.json";


const resources = {
    en: { translation: enUS },
    ru: { translation: ruRU },
    by: { translation: beBY },
    ua: { translation: ukUA },
}

i18n.use(initReactI18next)
.init({
    resources,
    lng: "by",
})

