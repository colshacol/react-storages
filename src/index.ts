import { createWatchStorage } from './createWatchStorage'
import { createCustomStorage } from './createCustomStorage'

export const localStorage = createCustomStorage(window.localStorage)
export const sessionStorage = createCustomStorage(window.sessionStorage)
export const watchStorage = createWatchStorage({ localStorage, sessionStorage })

if (process.env.NODE_ENV === 'development') {
  window.ls = localStorage
  window.ss = sessionStorage
}
