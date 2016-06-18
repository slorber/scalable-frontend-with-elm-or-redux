export default function toMapper() {
  const declarations = this;
  for (const declaration of declarations) {
    const [expectedType] = declaration;
    if (!expectedType) {
      const error = new Error('Missing expected type in mapper declaration');
      error.declaration = declaration;
      throw error;
    }
  }

  return function map(event, mapOptions) {
    const { type } = event;

    for (const tranformerDeclaration of declarations) {
      const [expectedType, declarationOptions = {}] = tranformerDeclaration;
      if (expectedType === type) {
        return {
          ...declarationOptions.map(event, mapOptions),
          type,
        };
      }
    }

    return event;
  };
}
