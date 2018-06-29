import React, { Component } from 'react';
import { HookEvent } from '../types';
import { State, Event, Id } from './types';
import reducer, {
  createEventFromHookEvent,
  getEvents,
  getSelectedEvent,
} from './state/event';
import Layout from './components/Layout';
import Timeline from './components/Timeline';
import Content from './components/Content';
import Detail from './components/Detail';
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
      <Layout>
        <Timeline
          events={events}
          selectedEventId={selectedEventId}
          onClickEventTimeline={this.onClickEventTimeline}
        />

        <Content>{selectedEvent && <Detail event={selectedEvent} />}</Content>
      </Layout>
    );
  }
}

export default App;
