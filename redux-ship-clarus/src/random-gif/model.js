// @flow

export type State = {
  gifUrl: ?string,
  isLoading: bool,
};

export const initialState: State = {
  gifUrl: null,
  isLoading: false,
};

export type Action = {
  type: 'LoadStart',
} | {
  type: 'LoadSuccess',
  gifUrl: string,
};

export function reduce(state: State, action: Action): State {
  switch (action.type) {
  case 'LoadStart':
    return {
      ...state,
      isLoading: true,
    };
  case 'LoadSuccess':
    return {
      ...state,
      isLoading: false,
      gifUrl: action.gifUrl,
    };
  default:
    return state;
  }
}
