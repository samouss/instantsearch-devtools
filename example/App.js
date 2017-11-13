import React from 'react';
import PropTypes from 'prop-types';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch/dom';

const App = ({ client, helper }) => (
  <InstantSearch
    indexName="bestbuy"
    algoliaClient={client}
    algoliaHelper={helper}
  >
    <SearchBox />
    <Hits />
  </InstantSearch>
);

App.propTypes = {
  // eslint-disable-next-line
  client: PropTypes.object.isRequired,
  // eslint-disable-next-line
  helper: PropTypes.object.isRequired,
};

export default App;
