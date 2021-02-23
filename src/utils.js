const t = require('@babel/types')
const { UNITLESS_NUMBERS, SHORTHAND_EXPANSIONS } = require('./constants.js')
const hash = require('murmurhash-js')
const cssProperties = require('known-css-properties').all

function expandProperty(prop) {
  return SHORTHAND_EXPANSIONS[prop] || [prop]
}

const BASE_FONT_SIZE_PX = 16

function isCustomProperty(name) {
  return name.startsWith('--')
}

function normalizeValue(prop, value) {
  if (isCustomProperty(prop)) return value

  if (typeof value === 'number') {
    if (prop === 'fontSize') return `${value / BASE_FONT_SIZE_PX}rem`
    if (!UNITLESS_NUMBERS.includes(prop)) return `${value}px`
  }

  if (Array.isArray(value)) return value.slice().join(' ')

  return value
}

// Class can't start with number
const CLASS_PREFIX = 'c'

function getClass(...args) {
  return CLASS_PREFIX + hash(JSON.stringify(args)).toString(36)
}

function camelToHyphen(string) {
  if (isCustomProperty(string)) return string

  return string.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
}

/**
 * Resolve the value of a node path
 */
function resolvePathValue(path) {
  const { value, confident, deopt } = path.evaluate()

  if (confident) return value
  throw deopt.buildCodeFrameError('Could not evaluate value')
}

function getDeclaration({ name, value, atRules, pseudoSelectors }) {
  const cls = getClass({ name, value, atRules, pseudoSelectors })

  return (
    atRules.map((rule) => rule + '{').join('') +
    '.' +
    cls +
    pseudoSelectors.join('') +
    '{' +
    camelToHyphen(name) +
    ':' +
    normalizeValue(name, value) +
    '}' +
    atRules.map(() => '}').join('')
  )
}

function normalizeTime(time) {
  if (time === 'from') return '0%'
  if (time === 'to') return '100%'

  return time
}

function stringifyKeyframes(rules) {
  let str = ''

  for (const time in rules) {
    if (!Object.keys(rules[time]).length) continue

    str += `${normalizeTime(time)}{`

    for (const key in rules[time]) {
      const value = rules[time][key]

      for (const prop of expandProperty(key)) {
        // Longhand takes precedent
        if (prop in rules[time] && prop !== key) continue

        str += `${camelToHyphen(prop)}:${normalizeValue(prop, value)};`
      }
    }

    // Remove last semicolon
    str = str.slice(0, -1) + '}'
  }

  return str
}

function getKeyframes(rules) {
  const rulesString = stringifyKeyframes(rules)
  const name = getClass(rulesString)
  const declaration = `@keyframes ${name}{${rulesString}}`

  return { name, declaration }
}

/**
 * Move node to a constant and return an identifier
 */
function extractNode(path, node) {
  if (t.isIdentifier(node)) return node

  const name = path.scope.generateUidBasedOnNode(node)

  if (path.scope.path.type !== 'Program') {
    path.scope.path.ensureBlock()
  }

  path.getStatementParent().insertBefore(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(name), node)]))

  return t.identifier(name)
}

const LEGACY_PSEUDO_ELEMENTS = [':before', ':after', ':first-letter', ':first-line']

function normalizePseudoElements(string) {
  if (LEGACY_PSEUDO_ELEMENTS.includes(string)) {
    return ':' + string
  }

  return string
}

function minifyProperty(name) {
  const hyphenName = camelToHyphen(name)

  if (cssProperties.includes(hyphenName)) {
    return cssProperties.indexOf(hyphenName).toString(36)
  }

  return hash(hyphenName).toString(36)
}

module.exports = {
  expandProperty,
  resolvePathValue,
  getClass,
  getDeclaration,
  extractNode,
  getKeyframes,
  normalizePseudoElements,
  minifyProperty
}
