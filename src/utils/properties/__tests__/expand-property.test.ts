import { expandProperty } from '../expand-property'

describe('expandProperty', () => {
  test.each([
    ['margin', ['marginTop', 'marginRight', 'marginBottom', 'marginLeft']],
    [
      'borderColor',
      [
        'borderTopColor',
        'borderRightColor',
        'borderBottomColor',
        'borderLeftColor'
      ]
    ]
  ])('should expand shorthand property', (property, expected) => {
    expect(expandProperty(property)).toEqual(expected)
  })

  test.each([
    ['color'],
    ['fontFamily'],
    ['background'],
    ['content'],
    ['backgroundColor']
  ])('should NOT expand base property %s', (attribute) => {
    expect(expandProperty(attribute)).toEqual([attribute])
  })
})
