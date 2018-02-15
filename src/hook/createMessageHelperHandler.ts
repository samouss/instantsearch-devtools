import { JSHelper, HookEvent } from '../types';

const createMessageHelperHandler = (_: JSHelper) => (_: HookEvent) => {
  // const createMessageHelperHandler = (helper: JSHelper) => (event: HookEvent) => {
  // TODO: implement when we need to sync the helper from an event of the
  // application. Ex: replay a request
};

export default createMessageHelperHandler;
