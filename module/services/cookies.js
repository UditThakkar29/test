function getCookie (name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift())
  }
}

function setCookie (name, value, expires, path) {
  const uriValue = encodeURIComponent(value)
  let updatedCookie = `${name}=${uriValue}`
  if (expires) {
    if (expires.toUTCString) {
      expires = expires.toUTCString()
    }
    updatedCookie += `; expires=${expires}`
  }

  if (path) {
    updatedCookie += `; path=${path}`
  }
  document.cookie = updatedCookie
}

function deleteCookie (name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

function deleteCookieWithPath (name) {
  document.cookie = `digital-catalog-session=;Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

function formatExpirationString (date) {
  date.setMonth(date.getMonth() + 1)
  return date.toUTCString()
}

function currentDateString () {
  const today = new Date()
  const currentDate = []
  currentDate.push(today.toJSON().slice(0, 10))
  return JSON.stringify(currentDate)
}

function setFlashMessageCookie (message) {
  if (!message) { return }
  const date = new Date()
  setCookie('flash_message', message, formatExpirationString(date), '/')
}

export {
  getCookie,
  setCookie,
  deleteCookie,
  deleteCookieWithPath,
  formatExpirationString,
  currentDateString,
  setFlashMessageCookie
}
