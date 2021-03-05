/**
 * Determines if the given property definition is a custom
 * property like `--primary`, where it might be used as a
 * CSS var like so `text-color:var(--primary)`.
 *
 * @param name Style property name
 */
export const isCustomProperty = (name: string) => name.startsWith('--')
