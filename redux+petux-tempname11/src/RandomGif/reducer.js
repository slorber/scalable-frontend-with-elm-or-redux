/* @flow */
import type { Action, State, Effect } from './types';
import RoutedEffect from '../RoutedEffect';

export default function (emit: (Effect<Action>) => void) {
  emit(RoutedEffect.create({ kind: 'REQUEST_NEW_GIF', topic: 'cats' }));
  
  const initial = {
    topic: 'cats',
    status: 'loading',
  };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'MORE_BUTTON_CLICKED':
        if (state.status === 'loading') {
          return state;
        } else {
          emit(RoutedEffect.create({ kind: 'REQUEST_NEW_GIF', topic: state.topic }));
          return { ...state, status: 'loading' };
        }
      case 'REQUEST_SUCCEDED':
        return { ...state, status: { src: action.src } };
      case 'REQUEST_FAILED':
        return { ...state, status: 'failed' };
      default:
        return state;
    }
  };

  return { initial, reducer };
}
