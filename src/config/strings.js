// Do not import this file directly into other code. Instead, import getString from utils.js, which
// provides a safer way to fetch the configuration variables here and is future proof should we
// introduce a way to have component-level translations.

// strings below can use "named arguments" as described in https://github.com/alexei/sprintf.js
const strings = {
  en: {
    siteTitle: 'GitHub Challenge',
    welcome: 'Welcome',
    search: 'Search',
    color: 'Color',
    noContent: {
      title: 'Page not found',
      bodyText: 'Sorry, the page you requested has gone walkabouts.',
    },
    Search: {
      title: 'Search GitHub repos',
      SearchInput: {
        placeholder: 'Search by overlapping topics, eg. ruby cms',
      },
      SearchResults: {
        noResults: 'Sorry, no repositories matched all the topics you searched for.',
        searchInProgress: 'Working...',
        detailsResultsFor: 'Showing page %(pageNumber)d of results for: ',
        detailsResultsTotal: '(%(resultsTotal)d results total)',
        topics: 'Topics',
        serviceUnavailable: 'Sorry, you have hit GitHub\'s rate limit for search requests. Please wait a moment or clear your cookies.',
      },
    },
  },
  'en-gb': {
    color: 'Colour',
  },
  fr: {
    search: 'Shercher',
  },
};

export default strings;
