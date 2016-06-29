export default function toConsumer() {
  return (message, consumeOptions) => {
    const { type } = message;
    this.forEach(consumerDeclaration => {
      const [expectedType, consume] = consumerDeclaration;
      if (expectedType === type) {
        consume(message, consumeOptions);
      }
    });
  };
}
