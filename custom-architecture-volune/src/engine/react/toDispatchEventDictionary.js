export default function toDispatchEventDictionary() {
  const keyToEventDictionary = this;
  return ({
    dispatch,
    getEmitterProps,
  }) => {
    const resultDictionary = {};
    Object.entries(keyToEventDictionary).forEach(([key, type]) => {
      resultDictionary[key] = (...args) => dispatch({
        type,
        args,
        getEmitterProps,
      });
    });
    return resultDictionary;
  };
}
