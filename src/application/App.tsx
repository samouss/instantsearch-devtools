import React, { Component } from 'react';
import { HookEvent } from '../types';
import { State, Event, Id } from './types';
import reducer, {
  createEventFromHookEvent,
  getEvents,
  getSelectedEvent,
} from './state/event';
import Timeline from './components/Timeline';
import './index.css';

type Props = {
  event?: HookEvent;
  emit: (event: HookEvent) => void;
};

class App extends Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { event } = nextProps;
    const { previousPropEvent } = prevState;

    if (event && event !== previousPropEvent) {
      return {
        ...reducer(prevState, createEventFromHookEvent(event)),
        previousPropEvent: event,
      };
    }

    return null;
  }

  readonly state: State = {
    eventIds: [],
    eventById: new Map<Id, Event>(),
  };

  onClickEventTimeline = ({ id }: Event) => {
    this.setState(() => ({
      selectedEventId: id,
    }));
  };

  render() {
    const { selectedEventId } = this.state;
    const events = getEvents(this.state);
    const selectedEvent =
      selectedEventId && getSelectedEvent(this.state, selectedEventId);

    return (
      <div style={{ display: 'flex' }}>
        <Timeline
          events={events}
          selectedEventId={selectedEventId}
          onClickEventTimeline={this.onClickEventTimeline}
        />

        {selectedEvent && <p>Selected event {selectedEvent.id}</p>}
      </div>
    );
  }
}

export default App;
