import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import VisibleEventList from './containers/VisibleEventList';

const App = ({ store }) => (
  <Provider store={store}>
    <VisibleEventList />
  </Provider>
);

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
};

export default App;
