import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Tag = ({ type }) => (
  <span styleName={`Tag Tag--${type.toLowerCase()}`}>{type.toUpperCase()}</span>
);

Tag.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Tag;
