import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvent } from '../modules/events/reducer';
import EventDetail from '../components/EventDetail';

const VisibleEventDetail = ({ event }) => {
  if (!event) {
    return null;
  }

  return (
    <EventDetail
      {...event}
    />
  );
};

VisibleEventDetail.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
  }),
};

VisibleEventDetail.defaultProps = {
  event: null,
};

const mapStateToProps = state => ({
  event: getEvent(state),
});

export default connect(mapStateToProps)(VisibleEventDetail);
