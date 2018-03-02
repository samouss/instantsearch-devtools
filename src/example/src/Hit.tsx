import React from 'react';
import { Highlight } from 'flufykin/dom';

type Hit = {
  name: string;
};

type Props = {
  hit: Hit;
};

const Hit = ({ hit }: Props) => (
  <div>
    <Highlight attributeName="name" hit={hit} />
  </div>
);

export default Hit;
