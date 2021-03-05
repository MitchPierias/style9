import { SHORTHAND_EXPANSIONS } from '../constants'

export const expandProperty = (prop: string) =>
  SHORTHAND_EXPANSIONS[prop] || [prop]
