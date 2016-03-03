import {loop, Effects} from '@jarvisaoieong/redux-loop';

import {
  MODIFY_FIRST,
  MODIFY_SECOND,
  modifyFirst,
  modifySecond,
} from './actions';

import {
  reducer as randomGifPairReducer,
  initialState as randomGifPairInitialState,
} from 'modules/randomGifPair';

export const initialState = {
  first: randomGifPairInitialState,
  second: randomGifPairInitialState,
};

export default (state = initialState, action) => {
  if (action.type === MODIFY_FIRST) {
    const {model, effect} = randomGifPairReducer(state.first, action.action);

    return loop({
      ...state,
      first: model,
    },
      Effects.map(effect, modifyFirst),
    );
  };

  if (action.type === MODIFY_SECOND) {
    const {model, effect} = randomGifPairReducer(state.second, action.action);

    return loop({
      ...state,
      second: model,
    },
      Effects.map(effect, modifySecond),
    );
  };

  return loop(state, Effects.none());
}
