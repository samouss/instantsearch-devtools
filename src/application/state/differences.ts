import isEqual from 'lodash/isEqual';
import isPlainObject from 'lodash/isPlainObject';
import get from 'lodash/get';
import { JSHelperObject, JSHelperValue } from '../../types';
import { Differences } from '../types';

const isUndefined = (x: JSHelperValue): x is undefined => typeof x === 'undefined';
const isString = (x: JSHelperValue): x is string => typeof x === 'string';
const isNumber = (x: JSHelperValue): x is number => typeof x === 'number';
const isJSHelperObject = (x: JSHelperValue): x is JSHelperObject => isPlainObject(x);
const getCurrentAttribute = (prefix: string, attribute: string): string =>
  prefix ? `${prefix}.${attribute}` : attribute;

export const formatDiffView = (input: JSHelperValue): string => {
  if (isUndefined(input)) {
    return 'undefined';
  }

  if (isString(input)) {
    return `"${input}"`;
  }

  if (isNumber(input)) {
    return input.toString();
  }

  if (Array.isArray(input)) {
    return `[${input.map(x => `${formatDiffView(x)}`).join(', ')}]`;
  }

  return '⚠️';
};

export const collectUpdatedKeys = (
  previous: JSHelperObject,
  next: JSHelperObject,
  prefix: string = '',
): string[] => {
  return Object.keys(next).reduce<string[]>((acc, attribute) => {
    const previousValue = previous[attribute];
    const nextValue = next[attribute];

    if (isJSHelperObject(previousValue) && isJSHelperObject(nextValue)) {
      return acc.concat(
        collectUpdatedKeys(previousValue, nextValue, getCurrentAttribute(prefix, attribute)),
      );
    }

    if (!isEqual(previousValue, nextValue)) {
      return acc.concat(getCurrentAttribute(prefix, attribute));
    }

    return acc;
  }, []);
};

export const collectEventDifferences = (
  previous: JSHelperObject,
  next: JSHelperObject,
): Differences[] => {
  return collectUpdatedKeys(previous, next).map(attribute => {
    const previousValue = get(previous, attribute);
    const nextValue = get(next, attribute);

    const raw = {
      previous: previousValue,
      next: nextValue,
    };

    const view = {
      previous: formatDiffView(previousValue),
      next: formatDiffView(nextValue),
    };

    return {
      attribute,
      raw,
      view,
    };
  });
};
