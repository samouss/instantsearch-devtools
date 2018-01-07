import * as actionTypes from './actionTypes';

export const selectEvent = id => ({
  type: actionTypes.EVENT_SELECT,
  id,
});
