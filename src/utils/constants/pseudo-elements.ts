/**
 * Pseudo-elements as defined by the
 * [CSS Pseudo-Elements Module Level 4](https://www.w3.org/TR/css-pseudo-4/)
 * terms of the W3 CSS specifications.
 */
export const PSEUDO_ELEMENTS = [
  ':after',
  ':before',
  ':file-selector-button',
  ':first-letter',
  ':first-line',
  ':selection'
]

/**
 * Additional pseudo-elements which may not be supported
 * by all browsers as defined by the
 * [CSS Pseudo-Elements Module Level 4](https://www.w3.org/TR/css-pseudo-4/)
 * terms, in the W3 CSS specification.
 */
export const PSEUDO_ELEMENTS_EXPERIMENTAL = [
  ':backdrop',
  ':grammar-error',
  ':marker',
  ':part()',
  ':placeholder',
  ':spelling-error',
  ':target-text'
]
