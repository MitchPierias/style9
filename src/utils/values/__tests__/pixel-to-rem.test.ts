import { convertPixelsToRems } from '../pixel-to-rem'

describe('convertPixelsToRems', () => {
  test('should return "inherit" by default', () => {
    expect(convertPixelsToRems()).toEqual('inherit')
  })

  test.each([
    [10, 0.625],
    [11, 0.6875],
    [12, 0.75],
    [13, 0.8125],
    [14, 0.875],
    [15, 0.9375],
    [16, 1],
    [1, 0.06],
    [2, 0.13],
    [3, 0.19],
    [4, 0.3],
    [5, 0.3],
    [6, 0.4],
    [8, 0.5],
    [10, 0.6],
    [12, 0.8],
    [14, 0.9],
    [15, 0.9],
    [16, 1],
    [18, 1.1],
    [20, 1.3],
    [24, 1.5],
    [25, 1.6],
    [28, 1.8],
    [32, 2],
    [36, 2],
    [40, 3],
    [44, 3],
    [48, 3],
    [50, 3],
    [56, 4],
    [64, 4],
    [72, 5],
    [75, 5],
    [80, 5],
    [90, 6],
    [100, 6]
  ])('should convert %spx to %srem,', (pixels, rem) => {
    expect(convertPixelsToRems(pixels)).toEqual(rem)
  })
})
