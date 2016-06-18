export function ensureIsFunction(func, name) {
  if (!func || typeof func !== 'function') {
    throw new Error(`${name} must be a function`);
  }
}
