import {loop, Effects, combineReducers} from '@jarvisaoieong/redux-loop';
import {reducer as randomGif} from 'modules/randomGif';
import {reducer as randomGifPair} from 'modules/randomGifPair';
import {reducer as randomGifPairOfPair} from 'modules/randomGifPairOfPair';
import {reducer as randomGifList} from 'modules/randomGifList';
import {reducer as button} from 'modules/button';
import {reducer as counter, inc} from 'modules/counter';
import newGifCountHor from './newGifCountHor';
import {NEW_GIF_COUNT} from './actions';

const mainReducer = combineReducers({
  counter,
  button,
  randomGif: newGifCountHor('type', randomGif),
  randomGifPair: newGifCountHor('action.type', randomGifPair),
  randomGifPairOfPair: newGifCountHor('action.action.type', randomGifPairOfPair),
  randomGifList: newGifCountHor('action.type', randomGifList),
});

export default (state, action) => {
  const {model, effect} = mainReducer(state, action);

  if (action.type === NEW_GIF_COUNT) {
    if (model.counter >= 10 && model.button) {
      return loop(
        model
      ,
        Effects.batch([
          effect,
          Effects.constant(inc(2)),
        ])
      );
    } else {
      return loop(
        model
      ,
        Effects.batch([
          effect,
          Effects.constant(inc()),
        ])
      );
    }
  }

  return loop(model, effect);
}
