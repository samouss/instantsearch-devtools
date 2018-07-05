import * as diff from '../differences';

describe('diff', () => {
  describe('formatDiffView', () => {
    it('expect to format `undefined`', () => {
      const input = undefined;

      const expectation = 'undefined';
      const actual = diff.formatDiffView(input);

      expect(actual).toBe(expectation);
    });

    it('expect to format `string`', () => {
      const input = 'apple';

      const expectation = '"apple"';
      const actual = diff.formatDiffView(input);

      expect(actual).toBe(expectation);
    });

    it('expect to format `number`', () => {
      const input = 15;

      const expectation = '15';
      const actual = diff.formatDiffView(input);

      expect(actual).toBe(expectation);
    });

    it('expect to format `string[]`', () => {
      const input = ['Apple', 'Samsung'];

      const expectation = '["Apple", "Samsung"]';
      const actual = diff.formatDiffView(input);

      expect(actual).toBe(expectation);
    });

    it('expect to format `number[]`', () => {
      const input = [30, 60];

      const expectation = '[30, 60]';
      const actual = diff.formatDiffView(input);

      expect(actual).toBe(expectation);
    });

    it('expect to warn with `object`', () => {
      const input = {};
      const actual = diff.formatDiffView(input);

      expect(actual.includes('⚠️')).toBe(true);
    });

    it('expect to warn with `null`', () => {
      const input = null as any;
      const actual = diff.formatDiffView(input);

      expect(actual.includes('⚠️')).toBe(true);
    });
  });

  describe('collectUpdatedKeys', () => {
    it('expect to return root keys that change', () => {
      const previous = {
        query: '',
        hitsPerPage: 25,
      };

      const next = {
        query: 'Apple',
        hitsPerPage: 25,
      };

      const expectation = ['query'];
      const actual = diff.collectUpdatedKeys(previous, next);

      expect(actual).toEqual(expectation);
    });

    it('expect to return nested keys that change', () => {
      const previous = {
        hitsPerPage: 25,
        disjunctiveFacetsRefinements: {
          brand: [],
        },
      };

      const next = {
        hitsPerPage: 25,
        disjunctiveFacetsRefinements: {
          brand: ['Apple'],
        },
      };

      const expectation = ['disjunctiveFacetsRefinements.brand'];
      const actual = diff.collectUpdatedKeys(previous, next);

      expect(actual).toEqual(expectation);
    });

    it('expect to return deep nested keys that change', () => {
      const previous = {
        hitsPerPage: 25,
        disjunctiveFacetsRefinements: {
          brand: [],
          categories: {
            phone: [],
          },
        },
      };

      const next = {
        hitsPerPage: 25,
        disjunctiveFacetsRefinements: {
          brand: [],
          categories: {
            phone: ['Apple'],
          },
        },
      };

      const expectation = ['disjunctiveFacetsRefinements.categories.phone'];
      const actual = diff.collectUpdatedKeys(previous, next);

      expect(actual).toEqual(expectation);
    });

    it('expect to return keys that change with they are omit', () => {
      const previous = {
        hitsPerPage: 25,
        disjunctiveFacetsRefinements: {},
      };

      const next = {
        disjunctiveFacetsRefinements: {},
      };

      const expectation = ['hitsPerPage'];
      const actual = diff.collectUpdatedKeys(previous, next);

      expect(actual).toEqual(expectation);
    });

    it('expect to return an empty array when nothing change', () => {
      const previous = {
        hitsPerPage: 25,
        disjunctiveFacetsRefinements: {
          brand: [],
        },
      };

      const next = {
        hitsPerPage: 25,
        disjunctiveFacetsRefinements: {
          brand: [],
        },
      };

      const expectation: never[] = [];
      const actual = diff.collectUpdatedKeys(previous, next);

      expect(actual).toEqual(expectation);
    });
  });

  describe('collectEventDifferences', () => {
    it('expect to return an array of differences', () => {
      const previous = {
        query: '',
        hitsPerPage: 25,
        disjunctiveFacetsRefinements: {},
      };

      const next = {
        query: 'Apple',
        hitsPerPage: 25,
        disjunctiveFacetsRefinements: {
          brand: ['Apple'],
        },
      };

      const expectation = [
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
        {
          attribute: 'disjunctiveFacetsRefinements.brand',
          raw: {
            previous: undefined,
            next: ['Apple'],
          },
          view: {
            previous: 'undefined',
            next: '["Apple"]',
          },
        },
      ];

      const actual = diff.collectEventDifferences(previous, next);

      expect(actual).toEqual(expectation);
    });

    it('expect to return an empty array of differences', () => {
      const previous = {
        query: '',
        hitsPerPage: 25,
        disjunctiveFacetsRefinements: {},
      };

      const next = {
        query: '',
        hitsPerPage: 25,
        disjunctiveFacetsRefinements: {},
      };

      const expectation: never[] = [];
      const actual = diff.collectEventDifferences(previous, next);

      expect(actual).toEqual(expectation);
    });
  });
});
