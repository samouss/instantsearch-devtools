import sortObjectKeys from '../sortObjectKeys';

describe('sortObjectKeys', () => {
  it('exepct to return 1 with `query`, `page`', () => {
    const inputA = 'query';
    const inputB = 'page';

    const actual = sortObjectKeys(inputA, inputB);
    const expectation = 1;

    expect(actual).toBe(expectation);
  });

  it('exepct to return -1 with `page`, `query`', () => {
    const inputA = 'page';
    const inputB = 'query';

    const actual = sortObjectKeys(inputA, inputB);
    const expectation = -1;

    expect(actual).toBe(expectation);
  });

  it('exepct to return 1 with `_state`, `page`', () => {
    const inputA = '_state';
    const inputB = 'page';

    const actual = sortObjectKeys(inputA, inputB);
    const expectation = 1;

    expect(actual).toBe(expectation);
  });

  it('exepct to return -1 with `page`, `_state`', () => {
    const inputA = 'page';
    const inputB = '_state';

    const actual = sortObjectKeys(inputA, inputB);
    const expectation = -1;

    expect(actual).toBe(expectation);
  });
});
