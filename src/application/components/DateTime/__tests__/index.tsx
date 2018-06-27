import React from 'react';
import { shallow } from 'enzyme';
import DateTime from '../index';

describe('<DateTime />', () => {
  it('exepct to render', () => {
    const props = {
      value: new Date('01/01/2000'),
      format: 'MM-YYYY',
    };

    const wrapper = shallow(<DateTime {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
