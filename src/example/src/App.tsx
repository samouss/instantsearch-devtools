import React from 'react';
import { InstantSearch, SearchBox, Hits, Configure, RefinementList } from 'flufykin/dom';
import 'react-instantsearch-theme-algolia/style.css';
import Hit from './Hit';
import './App.css';

// @FIXME
type Props = {
  client: any;
  helper: any;
};

const App = ({ client, helper }: Props) => (
  <main>
    <InstantSearch indexName="bestbuy" algoliaClient={client} algoliaHelper={helper}>
      <Configure hitsPerPage={25} />

      <SearchBox />

      <div className="container">
        <RefinementList attributeName="category" />
        <Hits hitComponent={Hit} />
      </div>
    </InstantSearch>
  </main>
);

export default App;
