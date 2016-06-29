export default function toMessages() {
  return this.reduce(
    (object, key) =>
      Object.assign(object, {
        [key]: {
          toString() {
            return key;
          },
          toJSON() {
            return JSON.stringify(key);
          },
        },
      }),
    {}
  );
}
