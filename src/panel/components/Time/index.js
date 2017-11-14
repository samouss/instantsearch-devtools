import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './index.css';

const TimeAgo = ({ time }) => (
  <span styleName="Time">
    {moment(time).format('HH:mm:ss:SSSS')}
  </span>
);

TimeAgo.propTypes = {
  time: PropTypes.number.isRequired,
};

export default TimeAgo;
