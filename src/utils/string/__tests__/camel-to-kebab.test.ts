import { camelToKebab } from '../camel-to-kebab'

describe('camelToKebab', () => {
  test.each([
    ['color', 'color'],
    ['fontSize', 'font-size'],
    ['borderRightColor', 'border-right-color'],
    ['backgroundColor', 'background-color']
  ])(
    `should convert camelcase input "%s" to hyphenated output "%s"`,
    (input, expected) => {
      expect(camelToKebab(input)).toEqual(expected)
    }
  )

  test.each([
    ['FontSize'],
    ['Title case'],
    ['UPPERCASE'],
    ['lowercase'],
    ['kebab-case'],
    ['mixed-Case']
  ])(`should NOT convert non-camelcase input "%s"`, (input) => {
    expect(camelToKebab(input)).toEqual(input)
  })
})
