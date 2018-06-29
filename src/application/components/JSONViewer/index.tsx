import React, { SFC } from 'react';
import JSONTree, { JSONTreeProps } from 'react-json-tree';
import sortObjectKeys from './sortObjectKeys';
import theme from './theme';
import './index.css';

const JSONViewer: SFC<JSONTreeProps> = ({ data, ...rest }) => (
  <div styleName="JSONViewer">
    <JSONTree
      data={data}
      theme={theme}
      collectionLimit={75}
      hideRoot
      sortObjectKeys={sortObjectKeys}
      {...rest}
    />
  </div>
);

export default JSONViewer;
