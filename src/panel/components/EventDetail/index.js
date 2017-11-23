import React from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import Tag from '../Tag';
import Time from '../Time';
import './index.css';

const theme = {
  scheme: 'google',
  author: 'seth wright (http://sethawright.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#CC342B',
  base09: '#F96A38',
  base0A: '#FBA922',
  base0B: '#198844',
  base0C: '#3971ED',
  base0D: '#3971ED',
  base0E: '#A36AC7',
  base0F: '#3971ED',
};

const EventDetail = ({
  type,
  time,
  parameters,
  results,
}) => (
  <section styleName="EventDetail">
    <header>
      <span styleName="EventDetail__Type">
        <Tag type={type} />
      </span>

      <Time time={time} />
    </header>

    <div styleName="EventDetail__Parameters">
      <JSONTree
        data={parameters}
        theme={theme}
      />
    </div>

    {results && (
      <div styleName="EventDetail__Results">
        <JSONTree
          data={results}
          theme={theme}
        />
      </div>
    )}
  </section>
);

EventDetail.propTypes = {
  type: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  // eslint-disable-next-line
  parameters: PropTypes.object.isRequired,
  // eslint-disable-next-line
  results: PropTypes.object,
};

export default EventDetail;
