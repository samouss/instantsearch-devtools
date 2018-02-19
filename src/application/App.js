import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import VisibleEventList from './containers/VisibleEventList';
import VisibleEventDetail from './containers/VisibleEventDetail';
import Layout from './components/Layout';
import './index.css';

class App extends Component {
  constructor() {
    super();

    this.store = configureStore();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event) {
      // @TODO: create an action from the event
      // don't rely on HookEvent convert them
      // in application specific "domain"
      this.store.dispatch(nextProps.event);
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <Layout>
          <VisibleEventList />
          <VisibleEventDetail />
        </Layout>
      </Provider>
    );
  }
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  event: PropTypes.object,
};

App.defaultProps = {
  event: null,
};

export default App;
