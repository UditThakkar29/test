import ApiBase from './api-base'
import { getCookie } from './services/cookies'

class Api extends ApiBase {
  headers = {
    'X-Site-Country': 'SG',
    "X-App-Platform": "web_mobile",
    "X-App-Version": "1.0.0",
    "X-Platform": "web",
    'Content-Type': 'application/json'
  }

  async fetchPromotions ({
    pageSize = 30,
    pageNumber = 1
  } = {}) {
    const { data } = await this.client.get('/v2.5/beauty_perks/promotions', {
      params: {
        'page[size]': pageSize,
        'page[number]': pageNumber
      },
      headers: this.headers,
      baseURL: 'https://localhost:3000'
    })

    return data
  }

  async fetchBeautyPerksDiscountCoupons ({
    pageSize = 30,
    pageNumber = 1
  } = {}) {
    const { data } = await this.client.get('/v2.5/beauty_perks/discount_coupons', {
      params: {
        'page[size]': pageSize,
        'page[number]': pageNumber
      },
      headers: this.headers,
      baseURL: 'https://localhost:3000'
    })

    return data
  }

  async fetchBeautyPass () {
    const { data } = await this.client.get('/v2.5/beauty_perks/insider_gifts', {
      headers: this.headers,
      baseURL: 'https://localhost:3000'
    })

    return data
  }
}

export default Api