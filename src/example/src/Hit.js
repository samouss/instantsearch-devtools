import React from 'react';
import PropTypes from 'prop-types';
import { Highlight } from 'flufykin/dom';

const Hit = ({ hit }) => (
  <div>
    <Highlight attributeName="name" hit={hit} />
  </div>
);

Hit.propTypes = {
  hit: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Hit;
