import React, { SFC } from 'react';
import { Event } from '../../types';
import Type from '../Type';
import DateTime from '../DateTime';
import JSONViewer from '../JSONViewer';
import './index.css';

type Props = {
  event: Event;
};

const Detail: SFC<Props> = ({ event }) => (
  <div styleName="Detail">
    <div styleName="DetailHeader">
      <Type name={event.type} />
      <span styleName="DetailItemDate">
        <DateTime value={event.time} format="mm:ss.SSS" />
      </span>
    </div>

    {event.type === 'RESULT' && (
      <div styleName="DetailSearchResults">
        <pre styleName="DetailSearchTitle">searchResults</pre>
        <JSONViewer data={event.results} />
      </div>
    )}

    <div styleName="DetailSearchParameters">
      <pre styleName="DetailSearchTitle">searchParameters</pre>
      <JSONViewer data={event.parameters} />
    </div>
  </div>
);

export default Detail;
