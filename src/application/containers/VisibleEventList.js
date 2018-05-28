import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvents, getEvent } from '../modules/events/reducer';
import { selectEvent } from '../modules/events/actions';
import EventList from '../components/EventList';
import Event from '../components/Event';

const VisibleEventList = ({ events, event, onEventClick }) => (
  <EventList>
    {events.map(({ id, type, time }) => (
      <Event
        key={id}
        type={type}
        time={time}
        selected={id === event.id}
        onClick={onEventClick(id)}
      />
    ))}
  </EventList>
);

VisibleEventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  event: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    time: PropTypes.number,
  }),
  onEventClick: PropTypes.func.isRequired,
};

VisibleEventList.defaultProps = {
  event: {},
};

const mapStateToProps = state => ({
  events: getEvents(state),
  event: getEvent(state),
});

const mapDispatchToProps = dispatch => ({
  onEventClick: id => () => dispatch(selectEvent(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VisibleEventList);
