// Reference: https://github.com/nuxt/example-auth0
import Cookie from 'js-cookie'

export const save = (key, data) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem(key, JSON.stringify(data))
  Cookie.set(key, JSON.stringify(data))
}

export const flush = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.clear()
  Object.keys(Cookie.get()).forEach(k => {
    Cookie.remove(k)
  })
}

export const getFromCookie = (req, key) => {
  if (!req.headers || !req.headers.cookie) return
  // Use cookie parser module if you want to sustitute the below this statement
  let data = false
  req.headers.cookie.split(';').forEach(c => {
    if (c.trim().startsWith(`${key}=`)) data = c.split('=')[1]
  })
  return JSON.parse(decodeURIComponent(data))
}

export const getFromLocalStorage = (key) => {
  const json = window.localStorage[key]
  return json ? JSON.parse(json) : undefined
}
