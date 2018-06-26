import React from 'react';
import { shallow } from 'enzyme';
import Type from '../index';

describe('<Type />', () => {
  it('expect to render with "CHANGE"', () => {
    const props = {
      name: 'CHANGE',
    };

    const wrapper = shallow(<Type {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render with "SEARCH"', () => {
    const props = {
      name: 'SEARCH',
    };

    const wrapper = shallow(<Type {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render with "RESULT"', () => {
    const props = {
      name: 'RESULT',
    };

    const wrapper = shallow(<Type {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to be case insensitive', () => {
    const props = {
      name: 'reSuLt',
    };

    const wrapper = shallow(<Type {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
