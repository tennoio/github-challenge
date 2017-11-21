import axios from 'axios';
import { getConfig } from '../../../utils';

const _ = {};
_.map = require('lodash/map');

const perPage = getConfig('components.search.resultsPerPage') || 24;

const endpoints = {
  protocol: 'https',
  port: '443',
  domain: 'api.github.com',
  paths: {
    searchRepositories: '/search/repositories',
  },
};

// simple helper function
const getEndpointFor = (path) => {
  return endpoints.protocol + '://' + endpoints.domain + ':' + endpoints.port + path;
};

const api = {
  getRepositoriesByTopics: (topics, pageNumber = 1, resultsPerPage = perPage) => {
    // API example: /search/repositories?q=topic:ruby+topic:rails
    const topicNamesArray = topics.split(' ');
    // build the topic string to be appended to the url
    let topicString = '';
    _.map(topicNamesArray, (o) => {
      const name = o.trim();
      if (name) {
        // add the trimmed topic name to the end of the string we'll pass as a query to the API
        topicString += 'topic:' + name + '+';
      }
    });
    if (!topicString) {
      // todo: custom error object instantiation
      return Promise.reject(new Error('Invalid parameters sent to getRepositoriesByTopics (no valid topics provided)'));
    }
    // remove the trailing plus
    topicString = topicString.substr(0, topicString.length - 1);
    // trigger the call
    return axios.get(
      getEndpointFor(endpoints.paths.searchRepositories) +
        '?q=' + topicString +
        '&page=' + pageNumber +
        '&per_page=' + resultsPerPage
      ,
      {
        headers: {
          Accept: 'application/vnd.github.mercy-preview+json',
        },
        transformResponse: axios.defaults.transformResponse.concat((data) => {
          // github will return the total_count correctly, but only the first 1000 results are
          // actually accessible via the API. Cap the available result count.
          const dataModified = data;
          dataModified.total_count = Math.min(1000, data.total_count);
          return data;
        }),
      },
    );
  },
};

export default api;
