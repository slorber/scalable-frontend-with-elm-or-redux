import { Updater, Matchers } from 'redux-elm';

export const isActive = model => model;

export default new Updater(false, Matchers.exactMatcher)
  .case('Toggle', function*(model) {
    return !model;
  })
  .toReducer();