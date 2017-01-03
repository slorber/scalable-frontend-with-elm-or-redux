/* @flow */

export type Action =
  | { type: 'INCREMENT_CLICKED' }
  | { type: 'DECREMENT_CLICKED' }
;

export type State = number;
