import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'reactstrap';
import autoBind from 'react-autobind';

import SearchButton from './SearchButton';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

import {
  searchReset,
  searchStart,
  searchSetQueryPending,
  searchSetPageNumber,
} from './actions';

import { getRoutePathWithParams, getString } from '../../utils';

import './index.css';

const _ = {};
_.has = require('lodash/get');

// converts a route searchQuery value such as 'ruby+js+stuff' to 'ruby js stuff'
const decodeRouteSearchQuery = (routeSearchQuery) => {
  return routeSearchQuery.replace(/\+/g, ' ');
};

// converts a search string such as 'ruby js stuff' to 'ruby+js+stuff'
const encodeRouteSearchQuery = (searchQuery) => {
  return searchQuery.replace(/\s/g, '+');
};

const setPageTitle = (searchQuery) => {
  const siteTitle = getString('siteTitle');
  let pageTitle = '';
  if (searchQuery) {
    pageTitle = `'${searchQuery}' - `;
  }
  pageTitle += `Search | ${siteTitle}`;
  document.title = pageTitle;
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
    };
  }

  componentDidMount() {
    // if the component has just booted, check whether he have props that should populate redux
    // and trigger a search automatically.
    this.processRouteParams(this.props.match);
  }

  componentWillReceiveProps(nextProps) {
    // if the pathname of the route has changed, start the process of fetching the
    // search results to match the route's new params.
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.processRouteParams(nextProps.match);
    }
  }

  processRouteParams(match) {
    let triggerSearch = false;
    // Determine which redux properties should be populated by the params in the url, then trigger
    // the search to start if necessary.
    if (_.has(match, 'params.searchQuery')) {
      const searchQuery = decodeRouteSearchQuery(match.params.searchQuery);
      if (searchQuery) {
        this.props.searchSetQueryPending(searchQuery);
        triggerSearch = true;
      }
    }
    if (_.has(match, 'params.pageNumber')) {
      if (parseInt(match.params.pageNumber, 10)) {
        this.props.searchSetPageNumber(parseInt(match.params.pageNumber, 10));
        triggerSearch = true;
      }
    }
    if (triggerSearch) {
      // wait until the dispatches have updated our props on the next event loop, then run
      // the search.
      setTimeout(() => {
        this.props.searchStart(
          this.props.searchQueryPending,
          this.props.pageNumber,
          this.props.resultsPerPage,
        );
        setPageTitle(this.props.searchQueryPending);
      }, 0);
    } else {
      // if we don't have search params, then we need to reset the state to initial values to clear
      // the page
      this.props.searchReset();
    }
  }

  handleSubmit(e) {
    // stop default form submission
    e.preventDefault();
    // don't allow an empty search
    if (!this.props.searchQueryPending.trim()) {
      return;
    }
    const path = getRoutePathWithParams(
      'searchParamsFull',
      {
        searchQuery: encodeRouteSearchQuery(this.props.searchQueryPending),
        pageNumber: 1,
      },
    );
    // update the url with the new query
    this.props.history.push(path);
  }

  handlePageChange(page) {
    const path = getRoutePathWithParams(
      'searchParamsFull',
      {
        searchQuery: encodeRouteSearchQuery(this.props.searchQuery),
        // pagination component sents pages zero-indexed
        pageNumber: page.selected + 1,
      },
    );
    // update the url with the new query
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
        <Row className="scene-search">
          <Col xs="12" md="4">
            <h2>{getString('Search.title')}</h2>
          </Col>
          <Col xs="12" md="8">
            <Form onSubmit={this.handleSubmit} className="search-form">
              <SearchInput />
              <SearchButton />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <SearchResults onPageChange={this.handlePageChange} />
          </Col>
        </Row>
      </div>
    );
  }
}

Search.defaultProps = {
  searchQuery: '',
  searchQueryPending: '',
  pageNumber: 1,
  resultsPerPage: 1,
};

Search.propTypes = {
  searchQuery: PropTypes.string,
  searchQueryPending: PropTypes.string,
  pageNumber: PropTypes.number,
  resultsPerPage: PropTypes.number,
  searchReset: PropTypes.func.isRequired,
  searchStart: PropTypes.func.isRequired,
  searchSetQueryPending: PropTypes.func.isRequired,
  searchSetPageNumber: PropTypes.func.isRequired,
  // router props
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => {
  return {
    searchQuery: state.search.searchQuery,
    searchQueryPending: state.search.searchQueryPending,
    pageNumber: state.search.pageNumber,
    resultsPerPage: state.search.resultsPerPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchReset: () => {
      dispatch(searchReset());
    },
    searchStart: (searchQuery, pageNumber, resultsPerPage) => {
      dispatch(searchStart(searchQuery, pageNumber, resultsPerPage));
    },
    searchSetQueryPending: (searchQueryPending) => {
      dispatch(searchSetQueryPending(searchQueryPending));
    },
    searchSetPageNumber: (pageNumber) => {
      dispatch(searchSetPageNumber(pageNumber));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
