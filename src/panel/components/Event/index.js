import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../Tag';
import Time from '../Time';
import './index.css';

const Event = ({
  type,
  time,
  children,
  onClick,
}) => (
  <section styleName="EventLayout">
    <button
      styleName="EventLayout__Link"
      onClick={onClick}
    >
      <header styleName="EventLayout__Header">
        <Tag type={type} />
        <Time time={time} />
      </header>
      {children}
    </button>
  </section>
);

Event.propTypes = {
  type: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Event.defaultProps = {
  children: null,
};

export default Event;
