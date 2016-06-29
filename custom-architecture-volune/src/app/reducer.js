import Msg from './messages';

const DEFAULT_STATE = {
  incrementByTwoEnabled: false,
  counterValue: 0,
};

export default (state = DEFAULT_STATE, message) => {
  switch (message.type) {
    case Msg.INCREMENT_BY_TWO_TOGGLED:
      return {
        ...state,
        incrementByTwoEnabled: !state.incrementByTwoEnabled,
      };
    case Msg.COUNTER_INCREMENTED:
      return {
        ...state,
        counterValue: state.counterValue + message.increment,
      };
    default:
      return state;
  }
};
