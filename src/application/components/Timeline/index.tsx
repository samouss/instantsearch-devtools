import React, { SFC } from 'react';
import cx from 'classnames';
import { Event, Id } from '../../types';
import Type from '../Type';
import DateTime from '../DateTime';
import styles from './index.css';

export type Props = {
  events: Event[];
  onClickEventTimeline: (event: Event) => void;
  selectedEventId?: Id;
};

const Timeline: SFC<Props> = ({ events, selectedEventId, onClickEventTimeline }) => (
  <div styleName="Timeline">
    <ol styleName="EventList">
      {events.map(event => (
        <li
          key={event.id}
          className={cx(
            styles.EventListItem,
            event.id === selectedEventId && styles.EventListItemActive,
          )}
          onClick={() => onClickEventTimeline(event)}
        >
          <div styleName="EventListItemSummary">
            <Type name={event.type} />
            <span styleName="EventListItemDate">
              <DateTime value={event.time} format="mm:ss.SSS" />
            </span>
          </div>
          {event.type !== 'RESULT' &&
            Boolean(event.differences.length) && (
              <ul styleName="DifferenceList">
                {event.differences.map(difference => (
                  <li key={difference.attribute} styleName="DifferenceListItem">
                    <code styleName="DifferenceListItemCode">
                      {difference.attribute}: {difference.view.previous} → {difference.view.next}
                    </code>
                  </li>
                ))}
              </ul>
            )}
        </li>
      ))}
      <li styleName="EventListItem EventListItemSentinel">
        <span role="img" aria-label="Empty">
          📭
        </span>
      </li>
    </ol>
  </div>
);

export default Timeline;
