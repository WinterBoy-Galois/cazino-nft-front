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
import profileEN from './locales/profile/en.json';
import profileDE from './locales/profile/de.json';
import transactionsEN from './locales/transactions/en.json';
import transactionsDE from './locales/transactions/de.json';
import affiliatesEN from './locales/affiliates/en.json';
import affiliatesDE from './locales/affiliates/de.json';
import gamesEN from './locales/games/en.json';
import gamesDE from './locales/games/de.json';
import bonusesEN from './locales/bonuses/en.json';
import bonusesDE from './locales/bonuses/de.json';
import seedsEN from './locales/seeds/en.json';
import seedsDE from './locales/seeds/de.json';
import errorEN from './locales/error/de.json';
import errorDE from './locales/error/de.json';
import componentsEN from './locales/components/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        components: componentsEN,
        common: commonEN,
        home: homeEN,
        footer: footerEN,
        sidebar: sidebarEN,
        modals: modalsEN,
        auth: authEN,
        profile: profileEN,
        transactions: transactionsEN,
        games: gamesEN,
        affiliates: affiliatesEN,
        bonuses: bonusesEN,
        seeds: seedsEN,
        error: errorEN,
      },
      de: {
        components: componentsEN,
        common: commonDE,
        home: homeDE,
        footer: footerDE,
        sidebar: sidebarDE,
        modals: modalsDE,
        auth: authDE,
        profile: profileDE,
        transactions: transactionsDE,
        games: gamesDE,
        affiliates: affiliatesDE,
        bonuses: bonusesDE,
        seeds: seedsDE,
        error: errorDE,
      },
    },

    fallbackLng: 'en',
    whitelist: ['en', 'de'],
    debug: false,

    ns: [
      'common',
      'home',
      'footer',
      'sidebar',
      'modals',
      'auth',
      'profile',
      'transactions',
      'games',
      'affiliates',
      'bonuses',
      'seeds',
      'error',
    ],
    defaultNS: 'common',

    keySeparator: '.',

    interpolation: {
      escapeValue: true,
    },
  });

export default i18n;
