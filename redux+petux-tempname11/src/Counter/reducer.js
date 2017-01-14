/* @flow */
import type { Action, State } from './types';

export default {
  reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'INCREMENT_CLICKED':
        return state + 1;
      case 'DECREMENT_CLICKED':
        return state - 1;
      default:
        return state;
    }
  },
  initial: 0,
};
