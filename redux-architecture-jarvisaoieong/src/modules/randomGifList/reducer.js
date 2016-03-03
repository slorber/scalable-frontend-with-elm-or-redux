import _ from 'lodash';
import {loop, Effects} from '@jarvisaoieong/redux-loop';
import {
  reducer as randomGifReducer,
  initialState as randomGifInitialState,
  init as randomGifInit
} from 'modules/randomGif';
import {CREATE, MODIFY, modify} from './actions';

export const initialState = {
  gifList: [{
    id: 0,
    data: randomGifInitialState,
  }],
  nextId: 1,
};

export default (state = initialState, action) => {
  if (action.type === CREATE) {
    const {model, effect} = randomGifInit(action.topic);
    return loop({
      ...state,
      gifList: [
        ...state.gifList,
        {id: state.nextId, data: model},
      ],
      nextId: state.nextId + 1,
    },
      Effects.map(effect, modify, state.nextId)
    );
  };

  if (action.type === MODIFY) {
    const gifLoopList = _.map(state.gifList, (gif) => {
      if (gif.id !== action.id) {
        return loop(gif, Effects.none());
      };
      const {model, effect} = randomGifReducer(gif.data, action.action);
      return loop({
        id: gif.id,
        data: model,
      },
        Effects.map(effect, modify, gif.id)
      );
    });

    return loop({
      ...state,
      gifList: _.map(gifLoopList, 'model'),
    },
      Effects.batch(_.map(gifLoopList, 'effect'))
    );
  };

  return loop(state, Effects.none());
}
