import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import homeEN from './locales/home/en.json';
import homeDE from './locales/home/de.json';
import commonEN from './locales/common/en.json';
import commonDE from './locales/common/de.json';
import footerEN from './locales/footer/en.json';
import footerDE from './locales/footer/de.json';
import sidebarEN from './locales/sidebar/en.json';
import sidebarDE from './locales/sidebar/de.json';
import modalsEN from './locales/modals/en.json';
import modalsDE from './locales/modals/de.json';
import authEN from './locales/auth/en.json';
import authDE from './locales/auth/de.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEN,
        home: homeEN,
        footer: footerEN,
        sidebar: sidebarEN,
        modals: modalsEN,
        auth: authEN,
      },
      de: {
        common: commonDE,
        home: homeDE,
        footer: footerDE,
        sidebar: sidebarDE,
        modals: modalsDE,
        auth: authDE,
      },
    },

    fallbackLng: 'en',
    debug: false,

    ns: ['common', 'home', 'footer', 'sidebar', 'modals', 'auth'],
    defaultNS: 'common',

    keySeparator: '.',

    interpolation: {
      escapeValue: true,
    },
  });

export default i18n;
