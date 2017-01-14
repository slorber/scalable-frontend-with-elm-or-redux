/* @flow */

export type ActionOf<A> =
  | { type: 'FIRST' , payload: A }
  | { type: 'SECOND', payload: A }
;

export type StateOf<S> = [S, S];
