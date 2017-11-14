import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvents } from '../modules/events/reducer';
import { selectEvent } from '../modules/events/actions';
import EventList from '../components/EventList';
import Event from '../components/Event';

const VisibleEventList = ({ events, onEventClick }) => (
  <EventList>
    {events.map(({ id, type, time }) => (
      <Event
        key={id}
        type={type}
        time={time}
        onClick={onEventClick(id)}
      />
    ))}
  </EventList>
);

VisibleEventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  onEventClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  events: getEvents(state),
});

const mapDispatchToProps = dispatch => ({
  onEventClick: id => () => dispatch(selectEvent(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VisibleEventList);
