import React from 'react';
import { shallow } from 'enzyme';
import * as eventTestUtils from 'test/event';
import Detail from '../index';

describe('<Detail />', () => {
  it('expect to render with CHANGE event', () => {
    const props = {
      event: eventTestUtils.createFakeChangeEvent({
        parameters: {
          query: 'Apple',
        },
      }),
    };

    const wrapper = shallow(<Detail {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render with RESULT event', () => {
    const props = {
      event: eventTestUtils.createFakeResultEvent({
        parameters: {
          query: 'Apple',
        },
        results: {
          hits: [],
        },
      }),
    };

    const wrapper = shallow(<Detail {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
