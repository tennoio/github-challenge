import React from 'react';

import PropTypes from 'prop-types';

import './index.css';

const _ = {};
_.map = require('lodash/map');

const Header = (props) => {
  const classes = 'header header--level-' + props.level + ' ' + props.className;

  // custom h* component based on prop, see https://stackoverflow.com/a/33471928
  const Tag = `h${props.level}`;

  return (
    <div className={classes}>
      <Tag>
        {props.icon && <span className="header__icon">{props.icon}</span>}
        {props.children}
      </Tag>
    </div>
  );
};

Header.defaultProps = {
  className: '',
  level: 1,
  icon: '',
};

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  level: PropTypes.number,
  icon: PropTypes.element,
};

export default Header;
