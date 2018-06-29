import React from 'react';
import { shallow } from 'enzyme';
import Content from '../index';

describe('<Content />', () => {
  it('exepct to render', () => {
    const wrapper = shallow(<Content>This is the children.</Content>);

    expect(wrapper).toMatchSnapshot();
  });
});
