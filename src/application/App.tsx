import React, { Component } from 'react';
import { HookEvent } from '../types';
import { State, Event, Id } from './types';
import reducer, { createEventFromHookEvent, getEvents } from './state/event';
import Timeline from './components/Timeline/index';
import './index.css';

// @FIXME: use different name or re-export the types
// from one file to another...

type Props = {
  event?: HookEvent;
  emit: (event: HookEvent) => void;
};

class App extends Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { event } = nextProps;

    if (!event) {
      return null;
    }

    return reducer(prevState, createEventFromHookEvent(event));
  }

  state = {
    eventIds: [],
    eventById: new Map<Id, Event>(),
  };

  render() {
    const events = getEvents(this.state);

    return (
      <div>
        <Timeline events={events} />
      </div>
    );
  }
}

export default App;
