/* @flow */
import RoutedEffect, { emap } from '../RoutedEffect';
import type { ActionOf, StateOf } from './types';

type Emit<E> = E => void;
type Reducer<S, A> = (S, A) => S;
type Creator<S, A, E> = Emit<E> => { reducer: Reducer<S, A>, initial: S };

const to1 = <A>(a: A): ActionOf<A> => ({ type: 'FIRST', payload: a });
const to2 = <A>(a: A): ActionOf<A> => ({ type: 'SECOND', payload: a });

export default function <S, A, E: RoutedEffect<*, *, *>>(
  creator: Creator<S, A, E>
)
: Creator<StateOf<S>, ActionOf<A>, RoutedEffect<*, *, *>>
{
  return function(emit) {
    const First = creator(emap(to1)(emit));
    const Second = creator(emap(to2)(emit));

    const initial = [First.initial, Second.initial];

    function reducer(state, action) {
      switch (action.type) {
        case 'FIRST':
          return [First.reducer(state[0], action.payload), state[1]];
        case 'SECOND':
          return [state[0], Second.reducer(state[1], action.payload)];
        default:
          return state;
      }
    };

    return { reducer, initial };
  }
};
