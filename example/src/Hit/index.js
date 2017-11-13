import React from 'react';
import PropTypes from 'prop-types';

const Hit = ({ hit }) => (
  <div>
    {hit.name}
  </div>
);

Hit.propTypes = {
  hit: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Hit;
