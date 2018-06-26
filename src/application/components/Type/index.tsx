import React, { SFC } from 'react';
import cx from 'classnames';
import styles from './index.css';

type Props = {
  name: string;
};

const Type: SFC<Props> = ({ name }) => (
  <span className={cx(styles.Type, styles[`Type--${name.toLowerCase()}`])}>
    {name.toUpperCase()}
  </span>
);

export default Type;
