import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// English Translation Files Imports
import en_common from "./en/admin/common/en_common.json";
import en_sidebar from "./en/admin/layout/en_sidebar.json";

// Persian Translation Files Imports
import fa_common from "./fa/admin/common/fa_common.json";
import fa_sidebar from "./fa/admin/layout/fa_sidebar.json";

i18n.use(initReactI18next).init({
  debug: false,
  lng: "en",
  fallbackLng: "en", // use en if detected lng is not available

  //keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false, // react already safes from xss
  },

  resources: {
    en: {
      common: en_common,
      sidebar: en_sidebar,
    },
    fa: {
      common: fa_common,
      sidebar: fa_sidebar,
    },
  },
  // have a common namespace used around the full app
  // ns: ['postDetails', 'translations'],
  // defaultNS: 'translations',
});

export default i18n;