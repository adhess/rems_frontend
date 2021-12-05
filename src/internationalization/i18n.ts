import i18n from "i18next";
import TranslationEn from "../locals/translation-en";
import TranslationFr from "../locals/translation-fr";
import TranslationAr from "../locals/translation-ar";
// import Backend from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import { i18nextPlugin } from 'translation-check'
import LngDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: TranslationEn
    },
    fr: {
        translation: TranslationFr
    },
    ar: {
        translation: TranslationAr
    }
};

i18n
    // load translation using http -> see /public/locales
    // .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(i18nextPlugin)
    .use(LngDetector)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        },
        detection: {
            order: ["localStorage"],
            lookupLocalStorage: 'i18nextLng',
            // cache user language on
            caches: ['localStorage'],
        }
    })