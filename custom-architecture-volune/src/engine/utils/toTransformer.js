export const ANY = {};
export const FOUND = {};
export const NOT_FOUND = {};

const isIterable = (value) => (
  Boolean(value) && typeof value[Symbol.iterator] === 'function'
);

export default function toTransformer() {
  const declarations = this;
  for (const declaration of declarations) {
    const [expectedType, emittedType] = declaration;
    if (!expectedType) {
      const error = new Error('Missing expected type in transformer declaration');
      error.declaration = declaration;
      throw error;
    }
    if (!emittedType) {
      const error = new Error('Missing emitted type in transformer declaration');
      error.declaration = declaration;
      throw error;
    }
  }

  return function *tranform(event, transformOptions) {
    function *createEmittedMessages(message, emittedType, declarationOptions) {
      if (declarationOptions.create) {
        const details = declarationOptions.create(message, transformOptions);
        if (isIterable(details)) {
          for (const oneMessageDetails of details) {
            yield {
              ...oneMessageDetails,
              type: emittedType,
            };
          }
        } else {
          yield {
            ...details,
            type: emittedType,
          };
        }
      } else {
        yield {
          type: emittedType,
        };
      }
    }

    function *tranformMessage(message) {
      const { type } = message;
      let defaultPrevented = false;
      let found = false;

      for (const tranformerDeclaration of declarations) {
        const [expectedType, emittedType, declarationOptions = {}] = tranformerDeclaration;
        if (expectedType === type
          || expectedType === ANY
          || (expectedType === FOUND && found)
          || (expectedType === NOT_FOUND && !found)
        ) {
          found = true;
          if (declarationOptions.filter && !declarationOptions.filter(message, transformOptions)) {
            continue;
          }
          defaultPrevented = defaultPrevented || Boolean(declarationOptions.preventDefault);
          const emittedMessages = createEmittedMessages(message, emittedType, declarationOptions);
          for (const emittedMessage of emittedMessages) {
            if (declarationOptions.transformEmittedMessages) {
              yield* tranformMessage(emittedMessage);
            } else {
              yield emittedMessage;
            }
          }
          if (declarationOptions.stopPropagation) {
            break;
          }
        }
      }

      if (!defaultPrevented) {
        yield message;
      }
    }

    yield* tranformMessage(event);
  };
}
