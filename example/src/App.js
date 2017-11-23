import React from 'react';
import PropTypes from 'prop-types';
import { InstantSearch, SearchBox, Hits, Configure } from 'react-instantsearch/dom';
import Hit from './Hit';

const App = ({ client, helper }) => (
  <main>
    <h1>
      InstantSearch DevTools <span role="img" aria-label="InstantSearch">⚡️</span>
    </h1>

    <InstantSearch
      indexName="bestbuy"
      algoliaClient={client}
      algoliaHelper={helper}
    >
      <Configure
        hitsPerPage={30}
      />

      <SearchBox />

      <Hits
        hitComponent={Hit}
      />
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
