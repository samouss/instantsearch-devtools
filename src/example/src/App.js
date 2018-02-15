import React from 'react';
import PropTypes from 'prop-types';
import { InstantSearch, SearchBox, Hits, Configure } from 'flufykin/dom';
import Hit from './Hit';
import './App.css';

const App = ({ client, helper }) => (
  <main>
    <InstantSearch
      indexName="bestbuy"
      algoliaClient={client}
      algoliaHelper={helper}
    >
      <Configure hitsPerPage={30} />

      <SearchBox />

      <Hits hitComponent={Hit} />
    </InstantSearch>
  </main>
);

App.propTypes = {
  // eslint-disable-next-line
  client: PropTypes.object.isRequired,
  // eslint-disable-next-line
  helper: PropTypes.object.isRequired,
};

export default App;