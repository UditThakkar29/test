const routes = {
  baseURL: '',
  basePath: '/api'
}

const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Accept-Language': 'lng_en'
}

// To rename and refactor headers
// v2m5mHeaders is the new default headers for native APIs
const v2m5mHeaders = {
  'X-Site-Country': 'SG',
  'X-App-Platform': true ? 'web_mobile' : 'web_desktop',
  'X-App-Version': '1.0.0',
  'Content-Type': 'application/json'
}

export {
  routes,
  headers,
  v2m5mHeaders
}
