import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import './index.css';

const Pagination = (props) => {
  // sensible generic defaults and BEM naming
  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel="‹"
        nextLabel="›"
        breakLabel={<span>...</span>}
        pageCount={props.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        initialPage={props.pageNumber - 1}
        disableInitialCallback
        onPageChange={props.onPageChange}
        containerClassName="pagination"
        pageClassName="pagination__page"
        activeClassName="pagination__page--active"
        pageLinkClassName="pagination__page__link"
        previousClassName="pagination__step pagination__step--previous"
        nextClassName="pagination__step pagination__step--next"
        previousLinkClassName="pagination__step--previous__link"
        nextLinkClassName="pagination__step--next__link"
        disabledClassName="pagination__step--disabled"
        breakClassName="pagination__break"
        hrefBuilder={props.getPaginationLinkHref}
      />
    </div>
  );
};

Pagination.defaultProps = {
};

Pagination.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  getPaginationLinkHref: PropTypes.func.isRequired,
};

export default Pagination;
