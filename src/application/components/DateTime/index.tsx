import { format as dateFnsFormat } from 'date-fns';

type Props = {
  value: string | number | Date;
  format: string;
  children: (value: string) => JSX.Element;
};

const DateTime: React.SFC<Props> = ({ value, format, children }) =>
  children(dateFnsFormat(value, format));

export default DateTime;
