import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import './index.css';

const TimeAgo = ({ time }) => (
  <span styleName="Time">
    {DateTime.fromJSDate(new Date(time)).toFormat('HH:mm:ss:SSS')}
  </span>
);

TimeAgo.propTypes = {
  time: PropTypes.number.isRequired,
};

export default TimeAgo;
