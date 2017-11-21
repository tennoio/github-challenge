import { getConfig } from '../../utils';

import {
  SEARCH_RESET,
  SEARCH_IN_PROGRESS,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_SET_QUERY_PENDING,
  SEARCH_SET_PAGE_NUMBER,
} from './types';

const initialState = {
  isSearchInProgress: false,
  searchQuery: '',
  searchQueryPending: '',
  pageNumber: 1,
  resultsPerPage: getConfig('components.search.resultsPerPage'),
  searchResults: [],
  searchResultsTotal: 0,
  apiResponseStatusCode: 200,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_IN_PROGRESS:
      return {
        ...state,
        isSearchInProgress: true,
        searchQuery: action.payload.searchQuery,
        pageNumber: action.payload.pageNumber,
        resultsPerPage: action.payload.resultsPerPage,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        isSearchInProgress: false,
        searchQuery: action.payload.searchQuery,
        pageNumber: action.payload.pageNumber,
        resultsPerPage: action.payload.resultsPerPage,
        searchResults: action.payload.searchResults,
        searchResultsTotal: action.payload.searchResultsTotal,
        apiResponseStatusCode: action.payload.apiResponseStatusCode,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        isSearchInProgress: false,
        searchQuery: action.payload.searchQuery,
        pageNumber: action.payload.pageNumber,
        resultsPerPage: action.payload.resultsPerPage,
        searchResults: [],
        apiResponseStatusCode: action.payload.apiResponseStatusCode,
      };
    case SEARCH_SET_QUERY_PENDING:
      return {
        ...state,
        searchQueryPending: action.payload.searchQueryPending,
      };
    case SEARCH_SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload.pageNumber,
      };
    case SEARCH_RESET:
      return {
        ...initialState,
      };
    default:
  }

  return state;
};

export default reducer;
