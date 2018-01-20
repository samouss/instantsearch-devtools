import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import VisibleEventList from './containers/VisibleEventList';
import VisibleEventDetail from './containers/VisibleEventDetail';
import Layout from './components/Layout';
import './index.css';

const App = ({ store }) => (
  <Provider store={store}>
    <Layout>
      <VisibleEventList />
      <VisibleEventDetail />
    </Layout>
  </Provider>
);

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
};

export default App;
