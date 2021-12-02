import i18n from "i18next";
import translationEn from "../locals/translation-en";
import translationFr from "../locals/translation-fr";
import translationAr from "../locals/translation-ar";
// import Backend from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: translationEn
    },
    fr: {
        translation: translationFr
    },
    ar: {
        translation: translationAr
    }
};

i18n
    // load translation using http -> see /public/locales
    // .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    })