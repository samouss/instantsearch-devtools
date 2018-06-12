import React, { Component } from 'react';
import { HookEvent } from '../types';
import { State, Action, Id } from './types';
import reducer, { getActions } from './state/actions';
import './index.css';

// @FIXME: use different name or re-export the types
// from one file to another...

type Props = {
  event?: HookEvent;
  emit: (event: HookEvent) => void;
};

class App extends Component<Props, State> {
  state = {
    actionIds: [],
    actionById: new Map<Id, Action>(),
  };

  componentWillReceiveProps(nextProps: Props) {
    const { event } = nextProps;

    if (event) {
      this.setState(prevState => reducer(prevState, event));
    }
  }

  render() {
    const actions = getActions(this.state);

    return <div>{actions.map(({ id }) => <p key={id}>{id}</p>)}</div>;
  }
}

export default App;
