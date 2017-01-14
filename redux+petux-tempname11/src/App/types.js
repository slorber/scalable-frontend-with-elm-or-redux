/* @flow */
import type { ActionOf as Split, StateOf as Pair } from '../Pair/types';

import type {
  Action as GifAction,
  State as GifState,
  Effect as GifEffect,
} from '../RandomGif/types';

import type { Action as ButtonAction, State as ButtonState } from '../Button/types';
import type { Action as CounterAction, State as CounterState } from '../Counter/types';

export type Action =
  | { type: 'COUNTER', payload: CounterAction }
  | { type: 'BUTTON', payload: ButtonAction }
  | { type: 'GIF', payload: GifAction }
  | { type: 'PAIR', payload: Split<GifAction> }
  | { type: 'QUAD', payload: Split<Split<GifAction>> }
;

export type State = {
  counter: CounterState,
  button: ButtonState,
  gif   : GifState,
  pair  : Pair<GifState>,
  quad  : Pair<Pair<GifState>>,
};

export type Effect<A> =
  | GifEffect<A>;
