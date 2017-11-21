import config from './config/config';
import strings from './config/strings';

const _ = {};
_.has = require('lodash/has');
_.get = require('lodash/get');

const { sprintf } = require('sprintf-js');

// gets a configuration variable by string pathname
const getConfig = (name) => {
  return _.get(config, name, undefined);
};

// gets a route path with optional route parameter replacement
const getRoutePathWithParams = (name, routeParams = {}) => {
  let routePath = getConfig('routePaths.' + name);
  if (!routePath) {
    console.error('config: getRoutePathWithParams given invalid route name:', name, routeParams);
    return null;
  }
  const keys = Object.keys(routeParams);
  keys.forEach((key) => {
    routePath = routePath.replace(':' + key, routeParams[key]);
  });
  return routePath;
};

const languageFallback = getConfig('localisation.languageFallback');

// Fetches a string from the localisation table.
//   - If passed a valid language code, will use that language's values or the fallback language if
//     the value cannot be found.
//   - If a string contains placeholders, the value object's props will be used for replacement. See
//     the "named values" section of https://github.com/alexei/sprintf.js for a format explanation.
const getString = (name, langOrValues, replacementValues) => {
  // if only two arguments are sent, treat the second one as the values. This allows callers to skip
  // sending a useless second param for default language calls.
  let lang = getConfig('localisation.lang');
  let values = {};
  if (!replacementValues) {
    values = langOrValues || values;
  } else {
    lang = langOrValues || lang;
    values = replacementValues || values;
  }
  // if the string isn't on the specified language...
  if (!_.has(strings[lang], name)) {
    // and the user wants to know...
    if (getConfig('localisation.warnOnMissingTranslations')) {
      console.warn(`Strings: Untranslated string for name '${name}' in lang '${lang}'; falling back to '${languageFallback}'.`);
    }
    // use the fallback language instead
    lang = languageFallback;
    // if the string isn't on the fallback language either then error because it's probably a typo
    if (!_.has(strings[lang], name)) {
      console.error(`Strings: Missing string for name '${name}'. Please check the name exists.`);
      return `<missing string: ${name}>`;
    }
  }
  return sprintf(_.get(strings[lang], name), values);
};

export {
  getConfig,
  getRoutePathWithParams,
  getString,
};
