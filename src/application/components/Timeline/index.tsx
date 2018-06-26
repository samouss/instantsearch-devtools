import React, { SFC } from 'react';
import { Event } from '../../types';
import Type from '../Type';
import DateTime from '../DateTime';
import './index.css';

export type Props = {
  events: Event[];
};

const Timeline: SFC<Props> = ({ events }) => (
  <div styleName="Timeline">
    <ol styleName="EventList">
      {events.map(event => (
        <li key={event.id} styleName="EventListItem">
          <Type name={event.type} />
          <DateTime value={event.time} format="mm:ss.SSS">
            {time => <span styleName="EventListItemDate">{time}</span>}
          </DateTime>
        </li>
      ))}
    </ol>
  </div>
);

export default Timeline;
