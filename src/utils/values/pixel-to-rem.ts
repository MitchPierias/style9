/**
 * Base font size in pixels
 */
const BASE_FONT_SIZE = 16

/**
 * Converts a given pixel value into the equivalent rem value,
 * given the optional base size, or 16 by default.
 *
 * @param pixels Numerical pixel value
 * @param base (optional) Base pixel value, defaults to 16
 */
export const convertPixelsToRems = (pixels?: number, base = BASE_FONT_SIZE) => {
  // Escape if pixel value is not of the expected type
  if (pixels === undefined || Number.isNaN(pixels)) {
    return 'inherit'
  }

  return pixels / base
}
