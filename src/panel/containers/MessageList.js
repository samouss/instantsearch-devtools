import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMessages } from '../modules/messages/reducer';

const MessageList = ({ messages }) => (
  <ul>
    {messages.map(message => (
      <li key={message.id}>
        {message.type} - {message.time}
      </li>
    ))}
  </ul>
);

MessageList.propTypes = {
  // eslint-disable-next-line
  messages: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = state => ({
  messages: getMessages(state),
});

export default connect(mapStateToProps)(MessageList);
