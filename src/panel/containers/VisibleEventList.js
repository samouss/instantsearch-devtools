import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvents } from '../modules/events/reducer';
import EventList from '../components/EventList';
import Event from '../components/Event';

const VisibleEventList = ({ messages }) => (
  <EventList>
    {messages.map(({ id, type, time }) => (
      <Event
        key={id}
        type={type}
        time={time}
      />
    ))}
  </EventList>
);

VisibleEventList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = state => ({
  messages: getEvents(state),
});

export default connect(mapStateToProps)(VisibleEventList);
