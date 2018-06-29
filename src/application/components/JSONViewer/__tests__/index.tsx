import React from 'react';
import { shallow } from 'enzyme';
import JSONViewer from '../index';

describe('<JSONViewer />', () => {
  it('exepct to render', () => {
    const props = {
      data: {
        facets: {},
        query: 'Apple',
      },
    };

    const wrapper = shallow(<JSONViewer {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('exepct to render with provided props', () => {
    const props = {
      data: {
        facets: {},
        query: 'Apple',
      },
      collectionLimit: 5,
    };

    const wrapper = shallow(<JSONViewer {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
