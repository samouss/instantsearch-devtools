import React from 'react';
import { format as dateFnsFormat } from 'date-fns';

type Props = {
  value: string | number | Date;
  format: string;
};

const DateTime: React.SFC<Props> = ({ value, format }) => (
  <>{dateFnsFormat(value, format)}</>
);

export default DateTime;
