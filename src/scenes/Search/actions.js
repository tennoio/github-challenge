import api from './api';
import {
  SEARCH_RESET,
  SEARCH_IN_PROGRESS,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_SET_QUERY_PENDING,
  SEARCH_SET_PAGE_NUMBER,
} from './types';

export function searchInProgress(searchQuery, pageNumber, resultsPerPage) {
  return {
    type: SEARCH_IN_PROGRESS,
    payload: {
      searchQuery,
      pageNumber,
      resultsPerPage,
    },
  };
}

export function searchSuccess(
  searchQuery,
  pageNumber,
  resultsPerPage,
  searchResults,
  searchResultsTotal,
  apiResponseStatusCode,
) {
  return {
    type: SEARCH_SUCCESS,
    payload: {
      searchQuery,
      pageNumber,
      resultsPerPage,
      searchResults,
      searchResultsTotal,
      apiResponseStatusCode,
    },
  };
}

export function searchFailure(searchQuery, pageNumber, resultsPerPage, apiResponseStatusCode) {
  return {
    type: SEARCH_FAILURE,
    payload: {
      searchQuery,
      pageNumber,
      resultsPerPage,
      searchResults: [],
      searchResultsTotal: 0,
      apiResponseStatusCode,
    },
  };
}

export function searchStart(searchQuery, pageNumber, resultsPerPage) {
  return (dispatch) => {
    dispatch(searchInProgress(
      searchQuery,
      pageNumber,
      resultsPerPage,
    ));
    api.getRepositoriesByTopics(searchQuery, pageNumber, resultsPerPage)
      .then((result) => {
        dispatch(searchSuccess(
          searchQuery,
          pageNumber,
          resultsPerPage,
          result.data.items,
          result.data.total_count,
          200,
        ));
      })
      .catch((err) => {
        console.error('Search/actions: getRepositoriesByTopics failed', err);
        dispatch(searchFailure(
          searchQuery,
          pageNumber,
          resultsPerPage,
          err.response.status,
        ));
      });
  };
}

export function searchSetQueryPending(searchQueryPending) {
  return {
    type: SEARCH_SET_QUERY_PENDING,
    payload: {
      searchQueryPending,
    },
  };
}

export function searchSetPageNumber(pageNumber) {
  return {
    type: SEARCH_SET_PAGE_NUMBER,
    payload: {
      pageNumber,
    },
  };
}

export function searchReset() {
  return {
    type: SEARCH_RESET,
    payload: {
    },
  };
}
