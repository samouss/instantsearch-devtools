import React, { Component } from 'react';
import { HookEvent } from '../types';
import { State, Action, Id } from './types';
import reducer, { createActionFromEvent, getActions } from './state/actions';
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

    return reducer(prevState, createActionFromEvent(event));
  }

  state = {
    actionIds: [],
    actionById: new Map<Id, Action>(),
  };

  render() {
    const actions = getActions(this.state);

    return <div>{actions.map(({ id }) => <p key={id}>{id}</p>)}</div>;
  }
}

export default App;
