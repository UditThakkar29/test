// import Vue from 'vue'
// import Vuex from 'vuex'
import { createStore } from 'vuex'
import Api from '../module/api'

// Vue.use(Vuex)

const beautyPerksApi = new Api()

const store = createStore({
  state: {
    promotions: [],
    beautyPerksDiscountCoupons: [],
    gifts: [],
    rewards: [],
    filters: [],
    user: null,
    beautyPassLoading: true,
    impressionTrackedPerkIds: {}
  },

  setters: {
    setPromotions (state, promotions) {
      state.promotions = promotions
    },
    setBeautyPerksDiscountCoupons (state, beautyPerksDiscountCoupons) {
      state.beautyPerksDiscountCoupons = beautyPerksDiscountCoupons
    },
    setGifts (state, gifts) {
      state.gifts = gifts
    },
    setRewards (state, rewards) {
      state.rewards = rewards
    },
    setUser (state, user) {
      state.user = user
    },
    setBeautyPassLoading (state, bool) {
      state.beautyPassLoading = bool
    },
    resetImpressionTrackedPerkIds (state) {
      state.impressionTrackedPerkIds = {}
    }
  },
  actions: {
    async fetchPromotions ({ commit }) {
      try {
        const { data, meta } = await beautyPerksApi.fetchPromotions()
        const promotions = mapPerks(data)
  
        const user = {
          firstName: meta['user-name']
        }
  
        commit('setUser', { ...state.user, ...user })
        commit('setPromotions', promotions)
      } catch { }
    },
    async fetchBeautyPerksDiscountCoupons ({ commit }) {
      try {
        const { data, meta } = await beautyPerksApi.fetchBeautyPerksDiscountCoupons()
        const beautyPerksDiscountCoupons = mapPerks(data)
  
        if (this.state.user.firstName == null) {
          const user = {
            firstName: meta['user-name']
          }
  
          commit('setUser', { ...state.user, ...user })
        }
        commit('setBeautyPerksDiscountCoupons', beautyPerksDiscountCoupons)
      } catch { }
    },
    async fetchBeautyPass ({ commit }) {
      try {
        const { data, rewards, user, included } = await beautyPerksApi.fetchBeautyPass()
        const gifts = mapGifts(data)
  
        commit('setUser', mapUser(user))
        commit('setGifts', gifts)
        commit('setRewards', mapRewards(rewards, filterByType(included, 'variants')))
      } catch { }
      commit('setBeautyPassLoading', false)
    }
  },
  getters: {
    promotions: (state) => {
      return state.promotions
    },
    beautyPerksDiscountCoupons: (state) => {
      return state.beautyPerksDiscountCoupons
    },
    beautyPerkPromotion: (state) => (id) => {
      return state.promotions.find(promo => promo.id === id)
    },
    beautyPerkOffer: (state) => (id) => {
      return state.beautyPerksDiscountCoupons.find(promo => promo.id === id)
    },
    filters: (state) => {
      return state.filters
    }
  }
})

// export const state = {
  
// }

// export const mutation = {
  //   setPromotions (state, promotions) {
    //     state.promotions = promotions
    //   },
    //   setBeautyPerksDiscountCoupons (state, beautyPerksDiscountCoupons) {
      //     state.beautyPerksDiscountCoupons = beautyPerksDiscountCoupons
      //   },
      //   setGifts (state, gifts) {
        //     state.gifts = gifts
        //   },
        //   setRewards (state, rewards) {
          //     state.rewards = rewards
          //   },
          //   setUser (state, user) {
            //     state.user = user
//   },
//   setBeautyPassLoading (state, bool) {
  //     state.beautyPassLoading = bool
  //   },
  //   resetImpressionTrackedPerkIds (state) {
    //     state.impressionTrackedPerkIds = {}
    //   }
// }

// export const actions = {
  //   async fetchPromotions ({ commit }) {
    //     try {
      //       const { data, meta } = await beautyPerksApi.fetchPromotions()
      //       const promotions = mapPerks(data)
      
      //       const user = {
        //         firstName: meta['user-name']
        //       }
        
        //       commit('setUser', { ...state.user, ...user })
        //       commit('setPromotions', promotions)
        //     } catch { }
        //   },
        //   async fetchBeautyPerksDiscountCoupons ({ commit }) {
          //     try {
            //       const { data, meta } = await beautyPerksApi.fetchBeautyPerksDiscountCoupons()
            //       const beautyPerksDiscountCoupons = mapPerks(data)
            
            //       if (this.state.user.firstName == null) {
              //         const user = {
                //           firstName: meta['user-name']
                //         }
                
                //         commit('setUser', { ...state.user, ...user })
                //       }
                //       commit('setBeautyPerksDiscountCoupons', beautyPerksDiscountCoupons)
                //     } catch { }
                //   },
                //   async fetchBeautyPass ({ commit }) {
                  //     try {
                    //       const { data, rewards, user, included } = await beautyPerksApi.fetchBeautyPass()
                    //       const gifts = mapGifts(data)
                    
                    //       commit('setUser', mapUser(user))
                    //       commit('setGifts', gifts)
                    //       commit('setRewards', mapRewards(rewards, filterByType(included, 'variants')))
//     } catch { }
//     commit('setBeautyPassLoading', false)
//   }
// }

function mapPerks (data) {
  const perks = data.map(perk => {
    return {
      id: perk.id,
      perkType: perk.type,
      name: perk.type === 'discount-coupons' ? perk.attributes['title'] : perk.attributes['name'],
      code: perk.attributes['code'],
      type: perk.attributes['type'],
      description: perk.attributes['description'],
      instructions: perk.attributes['instructions'],
      tnc: perk.attributes['tnc'],
      appDeepLink: perk.attributes['app-deep-link'],
      imageUrl: perk.attributes['image-url'],
      validTill: perk.attributes['valid-till']
    }
  })
  return perks
}

function mapGifts (data) {
  const gifts = data.map(gift => {
    return {
      id: gift.id,
      name: gift.attributes['name'],
      description: gift.attributes['description'],
      type: gift.attributes['type']
    }
  })
  return gifts
}

function mapUser (user) {
  return {
    id: user.id,
    type: user.type,
    firstName: user.attributes['first-name'],
    points: user.attributes['points'],
    tier: user.attributes['tier'],
    amountToNextTier: user.attributes['amount-to-next-tier'],
    amountToRetain: user.attributes['amount-to-retain'],
    tierExpiry: user.attributes['tier-expiry']
  }
}

function mapRewards (data, included) {
  const rewards = data.map(reward => {
    const variantId = reward.relationships.variant.data.id
    const variant = included.find(i => i.id === variantId && i.type === 'variants')
    return {
      id: reward.id,
      points: reward.attributes['point-value'],
      description: reward.attributes['description'],
      brandName: variant.attributes['brand-name'],
      icon: variant.attributes['icon-url']
    }
  })
  return rewards
}

// export const getters = {
  //   promotions: (state) => {
    //     return state.promotions
    //   },
    //   beautyPerksDiscountCoupons: (state) => {
      //     return state.beautyPerksDiscountCoupons
      //   },
      //   beautyPerkPromotion: (state) => (id) => {
        //     return state.promotions.find(promo => promo.id === id)
        //   },
        //   beautyPerkOffer: (state) => (id) => {
//     return state.beautyPerksDiscountCoupons.find(promo => promo.id === id)
//   },
//   filters: (state) => {
  //     return state.filters
  //   }
  // }


export default store;