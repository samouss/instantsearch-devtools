import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../Tag';
import Time from '../Time';
import './index.css';

const Event = ({
  type,
  time,
  children,
}) => (
  <section styleName="EventLayout">
    <a href="#!" styleName="EventLayout__Link">
      <header styleName="EventLayout__Header">
        <Tag type={type} />
        <Time time={time} />
      </header>
      {children}
    </a>
  </section>
);

Event.propTypes = {
  type: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  children: PropTypes.node,
};

Event.defaultProps = {
  children: null,
};

export default Event;
