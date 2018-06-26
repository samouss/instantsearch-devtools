import React from 'react';
import { shallow } from 'enzyme';
import DateTime from '../index';

describe('<DateTime />', () => {
  it('exepct to render with the date', () => {
    const props = {
      value: new Date('01/01/2000'),
      format: 'MM-YYYY',
      children: jest.fn(),
    };

    shallow(<DateTime {...props} />);

    expect(props.children).toHaveBeenCalledWith('01-2000');
  });
});
