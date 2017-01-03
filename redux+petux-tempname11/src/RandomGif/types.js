/* @flow */
import RoutedEffect from '../RoutedEffect';

export type Action = 
  | { type: 'MORE_BUTTON_CLICKED' }
  | { type: 'REQUEST_SUCCEDED', src: string }
  | { type: 'REQUEST_FAILED' }
;

export type State = {
  topic: string,
  status: 'loading' | 'failed' | { src: string },
};

type BaseEffect = { kind: 'REQUEST_NEW_GIF', topic: string };

export type Effect<A> = RoutedEffect<BaseEffect, Action, A>;
