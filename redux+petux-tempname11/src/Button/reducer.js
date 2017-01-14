/* @flow */
import type { Action, State } from './types';

export default {
  reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'CLICKED':
        return !state;
      default:
        return state;
    }
  },
  initial: true,
}
