import { getFromCookie } from '~/utils/storage'

let getFromLocalStorage = () => []

if (process.browser) {
  getFromLocalStorage = require('~/utils/storage').getFromLocalStorage
}

export default function ({ store, req }) {
  // If nuxt generate, pass this middleware
  if (process.server && !req) return
  const shopping = process.server ? getFromCookie(req, 'cart') : getFromLocalStorage('cart')
  store.commit('setShopping', shopping)
}
