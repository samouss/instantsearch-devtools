import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const EventList = ({ children }) => (
  <ul styleName="EventList">
    {children}
  </ul>
);

EventList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EventList;
