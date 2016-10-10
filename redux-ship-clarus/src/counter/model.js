// @flow

export type State = {
  count: number,
};

export const initialState: State = {
  count: 0,
};

export type Action = {
  type: 'IncrementByOne',
} | {
  type: 'IncrementByTwo',
};

export function reduce(state: State, action: Action): State {
  switch (action.type) {
  case 'IncrementByOne':
    return {
      ...state,
      count: state.count + 1,
    };
  case 'IncrementByTwo':
    return {
      ...state,
      count: state.count + 2,
    };
  default:
    return state;
  }
}
