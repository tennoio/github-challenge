import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

import './index.css';

const FontAwesome = require('react-fontawesome');

const SearchButton = (props) => {
  return (
    <Button
      className="search-button"
      color="primary"
      disabled={props.isSearchInProgress}
    >
      <span className="search-button__icon-container">
        {props.isSearchInProgress ?
          <FontAwesome name="cog" spin />
          :
          <FontAwesome name="search" />
        }
      </span>
      <span className="search-button__text d-none d-sm-block">Search</span>
    </Button>
  );
};

SearchButton.defaultProps = {
  isSearchInProgress: false,
};

SearchButton.propTypes = {
  isSearchInProgress: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isSearchInProgress: state.search.isSearchInProgress,
  };
};

export default connect(mapStateToProps, null)(SearchButton);
