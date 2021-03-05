/**
 * Converts a camelcase formatted string into a
 * hyphen separated string, known as kebab casing.
 *
 * @param input Camelcase text input
 */
export const camelToKebab = (input: string) =>
  input.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
