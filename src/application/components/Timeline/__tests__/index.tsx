import React from 'react';
import { shallow } from 'enzyme';
import * as eventTestUtils from 'test/event';
import Timeline from '../index';

describe('<Timeline />', () => {
  it('expect to render without events', () => {
    const props = {
      events: [],
    };

    const wrapper = shallow(<Timeline {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render with events', () => {
    const props = {
      events: [
        eventTestUtils.createFakeChangeEvent(),
        eventTestUtils.createFakeSearchEvent(),
        eventTestUtils.createFakeResultEvent(),
      ],
    };

    const wrapper = shallow(<Timeline {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
