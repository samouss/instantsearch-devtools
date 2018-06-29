import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../index';

describe('<Layout />', () => {
  it('exepct to render', () => {
    const wrapper = shallow(<Layout>This is the children.</Layout>);

    expect(wrapper).toMatchSnapshot();
  });
});
