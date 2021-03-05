import { isCustomProperty } from '../is-custom-property'

describe('isCustomProperty', () => {
  test.each([
    ['--primary'],
    ['--secondary'],
    ['--primary-text'],
    ['--button-text-highlight']
  ])('should return true for custom property definition', (property) => {
    expect(isCustomProperty(property)).toEqual(true)
  })
})
