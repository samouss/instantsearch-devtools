import React from 'react';
import { shallow } from 'enzyme';
import * as eventTestUtils from 'test/event';
import Timeline from '../index';

describe('<Timeline />', () => {
  const defaultProps = {
    events: [],
    onClickEventTimeline: () => {},
  };

  it('expect to render without events', () => {
    const props = {
      ...defaultProps,
    };

    const wrapper = shallow(<Timeline {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render with events', () => {
    const props = {
      ...defaultProps,
      events: [
        eventTestUtils.createFakeChangeEvent(),
        eventTestUtils.createFakeSearchEvent(),
        eventTestUtils.createFakeResultEvent(),
      ],
    };

    const wrapper = shallow(<Timeline {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render with a selected event', () => {
    const props = {
      ...defaultProps,
      events: [
        eventTestUtils.createFakeChangeEvent(),
        eventTestUtils.createFakeSearchEvent({
          id: 'SEARCH_ID',
        }),
        eventTestUtils.createFakeResultEvent(),
      ],
      selectedEventId: 'CHANGE_ID',
    };

    const wrapper = shallow(<Timeline {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render with differences', () => {
    const differences = [
      {
        attribute: 'query',
        raw: {
          previous: '',
          next: 'Apple',
        },
        view: {
          previous: '""',
          next: '"Apple"',
        },
      },
    ];

    const props = {
      ...defaultProps,
      events: [
        eventTestUtils.createFakeChangeEvent({
          differences,
        }),
        eventTestUtils.createFakeSearchEvent({
          id: 'SEARCH_ID',
        }),
        eventTestUtils.createFakeResultEvent(),
      ],
      selectedEventId: 'CHANGE_ID',
    };

    const wrapper = shallow(<Timeline {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to ignore differences on `RESULT`', () => {
    const differences = [
      {
        attribute: 'query',
        raw: {
          previous: '',
          next: 'Apple',
        },
        view: {
          previous: '""',
          next: '"Apple"',
        },
      },
    ];

    const props = {
      ...defaultProps,
      events: [
        eventTestUtils.createFakeChangeEvent(),
        eventTestUtils.createFakeSearchEvent({
          id: 'SEARCH_ID',
        }),
        eventTestUtils.createFakeResultEvent({
          differences,
        }),
      ],
      selectedEventId: 'CHANGE_ID',
    };

    const wrapper = shallow(<Timeline {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to call `onClickEventTimeline` on click', () => {
    const onClickEventTimeline = jest.fn();
    const event = eventTestUtils.createFakeSearchEvent({
      id: 'SEARCH_ID',
    });

    const props = {
      ...defaultProps,
      events: [
        eventTestUtils.createFakeChangeEvent(),
        event,
        eventTestUtils.createFakeResultEvent(),
      ],
      onClickEventTimeline,
    };

    const wrapper = shallow(<Timeline {...props} />);

    expect(onClickEventTimeline).not.toHaveBeenCalled();

    wrapper
      .find('li')
      .at(1)
      .simulate('click');

    expect(onClickEventTimeline).toHaveBeenCalledWith(event);
  });
});
