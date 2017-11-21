import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Label, Input } from 'reactstrap';
import { searchSetQueryPending } from '../actions';

import { getString } from '../../../utils';

import './index.css';

const _ = {};
_.map = require('lodash/map');

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {};
  }

  handleInput(e) {
    this.props.searchSetQueryPending(e.target.value);
  }

  render() {
    return (
      <span className="search-input">
        <Label for="search-input__input" className="sr-only">Search Query</Label>
        <Input
          className="search-input__input"
          type="search"
          name="search"
          id="search-input__input"
          onInput={this.handleInput}
          onChange={this.handleInput}
          value={this.props.searchQueryPending}
          placeholder={getString('Search.SearchInput.placeholder')}
        />
      </span>
    );
  }
}

SearchInput.defaultProps = {
  searchQueryPending: '',
};

SearchInput.propTypes = {
  searchQueryPending: PropTypes.string,
  searchSetQueryPending: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    searchQueryPending: state.search.searchQueryPending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchSetQueryPending: (searchQueryPending) => {
      dispatch(searchSetQueryPending(searchQueryPending));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
