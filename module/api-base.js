import axios from 'axios'
import * as ApiConfig from '../module/config'


class ApiBase {
  constructor ({ extendedHeaders = {} } = {}) {
    const { headers, routes, v2m5mHeaders } = ApiConfig

    this.resourceURL = routes.baseURL + routes.basePath
    const mergedHeaders = {
      ...headers,
      ...v2m5mHeaders,
      ...extendedHeaders
    }

    this.client = axios.create({
      baseURL: this.resourceURL,
      headers: mergedHeaders
    })
  }
}

export default ApiBase