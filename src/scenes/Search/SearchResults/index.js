import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import autoBind from 'react-autobind';

import { getRoutePathWithParams, getString } from '../../../utils';

import CardSetPaginated from '../../../components/CardSetPaginated';

import './index.css';

const _ = {};
_.map = require('lodash/map');

const FontAwesome = require('react-fontawesome');

const transformSearchResultsToCardFields = (searchResults) => {
  return _.map(searchResults, (o) => {
    return {
      id: o.id,
      cardHeader: (
        <h4><Link to={o.html_url} href={o.html_url} target="_blank">{o.name}</Link></h4>
      ),
      cardText: [
        o.description,
        (
          <div className="search-results-cards__misc-stars">
            <span><FontAwesome name="star" /></span>
            <span>{o.stargazers_count}</span>
          </div>
        ),
        (
          <div>
            <h5>{getString('Search.SearchResults.topics')}:</h5>
            <ul>
              {_.map(o.topics, (topic) => {
                const link = getRoutePathWithParams(
                  'searchParamsFull',
                  {
                    searchQuery: topic,
                    pageNumber: 1,
                  },
                );
                return (
                  <li key={topic}>
                    <Link
                      to={link}
                      href={link}
                    >
                      {topic}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ),
      ],
    };
  });
};

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      cards: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    // limit transforms of the results to when we receive new data
    if (nextProps.searchResults !== this.props.searchResults) {
      this.setState({
        cards: transformSearchResultsToCardFields(nextProps.searchResults),
      });
    }
  }

  getPaginationLinkHref(pageNumber) {
    return getRoutePathWithParams(
      'searchParamsFull',
      {
        searchQuery: this.props.searchQuery,
        pageNumber,
      },
    );
  }

  render() {
    return (
      <div className="search-results">

        { this.props.isSearchInProgress &&
          <div className="search-results__results-loading">
            <div><FontAwesome name="cog" spin /></div>
            <div>{getString('Search.SearchResults.searchInProgress')}</div>
          </div>
        }

        { !this.props.isSearchInProgress && this.props.searchResultsTotal ?
          <div className="search-results__results">

            <div className="search-results__results__details">
              <Row>
                <Col xs="12">
                  <span className="search-results__results__details__results-for">
                    {getString(
                      'Search.SearchResults.detailsResultsFor',
                      { pageNumber: this.props.pageNumber },
                    )}
                  </span>
                  <span className="search-results__results__details__query">
                    {this.props.searchQuery}
                  </span>
                  <span className="search-results__results__details__total">
                    {getString(
                      'Search.SearchResults.detailsResultsTotal',
                      { resultsTotal: this.props.searchResultsTotal },
                    )}
                  </span>
                </Col>
              </Row>
            </div>

            <div className="search-results__results__list">
              <Row>
                <Col xs="12">
                  <CardSetPaginated
                    className="search-results-cards"
                    cards={this.state.cards}
                    cardsTotal={this.props.searchResultsTotal}
                    pageNumber={this.props.pageNumber}
                    cardsPerPage={this.props.resultsPerPage}
                    onPageChange={this.props.onPageChange}
                    getPaginationLinkHref={this.getPaginationLinkHref}
                  />
                </Col>
              </Row>
            </div>

          </div>
          :
          ''
        }

        { !this.props.isSearchInProgress &&
          !this.props.searchResultsTotal &&
          this.props.searchQuery &&
          this.props.apiResponseStatusCode === 200 &&
          <Row className="search-results__results-none">
            <Col xs="12">
              <span>{getString('Search.SearchResults.noResults')}</span>
            </Col>
          </Row>
        }

        { !this.props.isSearchInProgress &&
          !this.props.searchResultsTotal &&
          this.props.searchQuery &&
          this.props.apiResponseStatusCode === 403 &&
          <Row className="search-results__results-none">
            <Col xs="12">
              <span>{getString('Search.SearchResults.serviceUnavailable')}</span>
            </Col>
          </Row>
        }

      </div>
    );
  }
}

SearchResults.defaultProps = {
  isSearchInProgress: false,
  searchQuery: '',
  pageNumber: 1,
  resultsPerPage: 1,
  searchResults: [],
  searchResultsTotal: 0,
  apiResponseStatusCode: 200,
};

SearchResults.propTypes = {
  isSearchInProgress: PropTypes.bool,
  searchQuery: PropTypes.string,
  pageNumber: PropTypes.number,
  resultsPerPage: PropTypes.number,
  searchResults: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  searchResultsTotal: PropTypes.number,
  apiResponseStatusCode: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isSearchInProgress: state.search.isSearchInProgress,
    searchQuery: state.search.searchQuery,
    pageNumber: state.search.pageNumber,
    resultsPerPage: state.search.resultsPerPage,
    searchResults: state.search.searchResults,
    searchResultsTotal: state.search.searchResultsTotal,
    apiResponseStatusCode: state.search.apiResponseStatusCode,
  };
};

export default connect(mapStateToProps, null)(SearchResults);
