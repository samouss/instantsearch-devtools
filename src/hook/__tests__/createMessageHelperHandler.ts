import { ChannelEvent, JSHelper } from '../../types';
import createMessageHelperHandler from '../createMessageHelperHandler';

describe('createMessageHelperHandler', () => {
  const createFakeHelper = (): JSHelper => ({
    on: jest.fn(),
  });

  it('expect to do nothing', () => {
    const helper = createFakeHelper();
    const event: ChannelEvent = {
      type: 'CHANGE',
      parameters: {},
    };

    createMessageHelperHandler(helper)(event);
  });
});
