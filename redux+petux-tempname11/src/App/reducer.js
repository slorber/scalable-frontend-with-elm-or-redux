/* @flow */
import Button from '../Button/reducer';
import Counter from '../Counter/reducer';
import pairOf from '../Pair/reducer';
import gifCreator from '../RandomGif/reducer';
import initLocalEffects from '../local-effects.js';
import { emap } from '../RoutedEffect';

import type { Action, State, Effect } from './types';

const toGif = emap(a => ({ type: 'GIF', payload: a }));
const toPair = emap(a => ({ type: 'PAIR', payload: a }));
const toQuad = emap(a => ({ type: 'QUAD', payload: a }));

export default function(outerEmit: (Effect<Action>) => void) {
  const { emit, withLocal } = initLocalEffects((effect, requested) => {
    outerEmit(effect);
    return requested || (effect.base.kind === 'REQUEST_NEW_GIF');
  });

  const Gif = gifCreator(toGif(emit));
  const Pair = pairOf(gifCreator)(toPair(emit));
  const Quad = pairOf(pairOf(gifCreator))(toQuad(emit));
  
  const initial: State = {
    counter: Counter.initial,
    button: Button.initial,
    gif: Gif.initial,
    pair: Pair.initial,
    quad: Quad.initial,
  };

  function inner(state: State, action: Action): State {
    switch (action.type) {
      case 'COUNTER':
        return { ...state, counter: Counter.reducer(state.counter, action.payload) };
      case 'BUTTON':
        return { ...state, button: Button.reducer(state.button, action.payload) };
      case 'GIF':
        return { ...state, gif: Gif.reducer(state.gif, action.payload) };
      case 'PAIR':
        return { ...state, pair: Pair.reducer(state.pair, action.payload) };
      case 'QUAD':
        return { ...state, quad: Quad.reducer(state.quad, action.payload) };
      default:
        return state;
    }
  };

  function reducer(state: State, action: Action): State {
    const [result, invokeBusinessRule] = withLocal(false,
      () => inner(state, action)
    );

    if (invokeBusinessRule) {
      const big = state.counter >= 10 && state.button;
      const counter = state.counter + (big ? 2 : 1);
      return { ...result, counter };
    }

    return result;
  }

  return { reducer, initial };
};
