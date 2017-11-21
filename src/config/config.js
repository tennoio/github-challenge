// Do not import this file directly into other code. Instead, import getConfig from utils.js, which
// provides a safer way to fetch the configuration variables here and is future proof should we
// introduce a way to have component-level configurations.

const config = {
  localisation: {
    // enables warnings in the console when a string is requested for a language that doesn't
    // have it explicitly defined
    warnOnMissingTranslations: false,
    // the language to use as the 'base' for the string translations should a requested string fail
    // to exist within the default or specified language
    languageFallback: 'en',
    // default language for system
    langDefault: 'en-gb',
    // todo: ideally this would be read from an external source such as the browser's language
    // setting or a user-configurable override, then fall back to the default above
    lang: 'en-gb',
  },
  // component-level configuration
  components: {
    search: {
      resultsPerPage: 12,
    },
  },
  routePaths: {
    search: '/search',
    searchParamsShort: '/search/:searchQuery',
    searchParamsFull: '/search/:searchQuery/page/:pageNumber',
  },
};

export default config;
