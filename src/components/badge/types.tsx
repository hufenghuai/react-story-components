import { badgeColor } from './config'

export type StatusRange = keyof typeof badgeColor

type StatusAnd = {
  [key in StatusRange]: StatusRange
}

export const statusObj: StatusAnd = {
  positive: 'positive',
  negative: 'negative',
  neutral: 'neutral',
  warning: 'warning',
  error: 'error'
}
