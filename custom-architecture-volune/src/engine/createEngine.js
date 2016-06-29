import EVENTS from './events';

const EMPTY_PROPS = {};
const EMPTY_DEPENDENCIES = {};

// Default mapper returns unmodified event
const DEFAULT_MAPPER = event => event;
// Default transformer only returns the event as a message
const DEFAULT_TRANSFORMER = event => [event];
// Default consumer does nothing
const DEFAULT_CONSUMER = () => undefined;
// Default reducer returns default state undefined and ignore messages
const DEFAULT_REDUCER = (state = undefined) => state;

const DEFAULT_GET_PROPS = () => EMPTY_PROPS;
const DEFAULT_GET_DEPENDENCIES = () => EMPTY_DEPENDENCIES;

export default function createEngine({
  mapper = DEFAULT_MAPPER,
  transformer = DEFAULT_TRANSFORMER,
  consumer = DEFAULT_CONSUMER,
  reducer = DEFAULT_REDUCER,
  initialState = undefined,
  getApiProps = DEFAULT_GET_PROPS,
  getDependencies = DEFAULT_GET_DEPENDENCIES,
}) {
  const engine = {};
  const listenersMap = {};
  let listenersList = null;
  let listenerKeyGenerator = 1;
  let state = initialState;

  let dispatching = false;

  const callListeners = (oldState, newState) => {
    if (!listenersList) {
      listenersList = Object.values(listenersMap);
    }
    listenersList.forEach(listener => listener(oldState, newState));
  };

  const getState = () => state;

  const dispatch = (event) => {
    if (dispatching) {
      throw new Error('Trying to dispatch external event while already dispatching');
    }

    dispatching = true;
    try {
      const oldState = state;

      const mappedEvent = mapper(event, {
        getState,
        getApiProps,
      });
      const messages = transformer(mappedEvent, {
        getState,
        getApiProps,
      });
      for (const message of messages) {
        consumer(message, {
          getDependencies,
          getState,
          getApiProps,
          dispatch,
        });
        state = reducer(state, message, {
          getApiProps,
        });
      }

      if (state !== oldState) {
        consumer({
          type: EVENTS.CHANGE,
          oldState,
          newState: state,
        });

        callListeners(oldState, state);
      }
    } finally {
      dispatching = false;
    }
  };

  const subscribe = listener => {
    const listenerKey = String(listenerKeyGenerator++);
    const subscription = {
      unsubscribe() {
        delete listenersMap[listenersMap];
        listenersList = null; // force refresh on next trigger
      },
    };
    listenersMap[listenerKey] = listener;
    listenersList = null; // force refresh on next trigger
    return subscription;
  };

  Object.assign(engine, {
    dispatch,
    getState,
    subscribe,
  });

  engine.dispatch({
    type: EVENTS.INIT,
  });

  return engine;
}
