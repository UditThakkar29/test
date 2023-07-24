<template>
  <div class="beauty-perks">
    <Header :title="title" :backToHome="true"></Header>
    <div class="banner-container">
      <div class="banner">
        <div class="greeting">Hi User</div>
        <div class="subtitle">Enjoy your perks - all in one place!</div>
      </div>
    </div>
    <div class="perk-container">
      <div class="nav-container">
        <div class="nav">
          <div class="perk-type" v-for="perk in perkTypes" :class="{ active: isActivePerk(perk) }" @click="setCurrentPerk(perk)">
            <div class="perk-image-container">
              <div class="perk-image" :class="`${perk.name}-nav`"></div>
            </div>
            <div class="perk-name">{{ perk.title }}</div>
          </div>
        </div>
      </div>
      <Promotion v-if="currentPerk.name == 'promotion'"/>
    </div>    
  </div>
</template>

<script setup>
  import { Promotion } from '#components';
  import { ref } from 'vue'
  const title = 'My Beauty Perks'
  const currentUser = true

  // const currentPerk = ref({ })
  const perkTypes = ref([
    {
      name: 'promotion',
      title: 'Ongoing Promotions',
      componentName: 'Promotion',
      tracking: 'Ongoing Promotions'
    },
    {
      name: 'offer',
      title: 'Offers for you',
      componentName: 'Offers',
      tracking: 'Offers For You'
    },
    {
      name: 'beautyPass',
      title: 'Beauty Pass Benifits',
      componentName: 'BeautyPass',
      tracking: 'Beauty Pass Benefits'
    }
  ])
  const currentPerk = ref({
    name: 'promotion',
    title: 'Ongoing Promotions',
    componentName: 'Promotion',
    tracking: 'Ongoing Promotions'
  })

  function isActivePerk (perk) {
    return currentPerk.value.name === perk.name
  }

  function setCurrentPerk (perk, eventType = 'click') {
    // const isTabChanged = currentPerk.value.name !== undefined && currentPerk.value.name !== perk.name
    currentPerk.value = perk
    debugger
  }

  function currentComponent () {
    debugger
    const component = currentPerk.value.componentName
    return resolveComponent(component)
  }
</script>

<style lang="scss" scoped>
  .beauty-perks {
    margin: auto;
    width: 100%;

    .banner-container {
      height: 172px;
      padding-top: 12px;
      background: linear-gradient(180deg, #B4A4F4 -71.3%, #957FEF 9.49%, #49416D 90.28%);
    }

    .banner {
      font-family: Helvetica, CenturyGothic, Arial;
      height: 112px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      background-image: url('../assets/images/beauty-perks/banner.svg');
      background-repeat: no-repeat;
      background-size: contain;

      .greeting {
        font-weight: 700;
        font-size: 16px;
        margin-top: 10px;
        text-transform: capitalize;
      }

      .subtitle {
        font-size: 14px;
        letter-spacing: 0.003em;
        text-align: center;
        width: 120px;
      }
    }

    .perk-container {
      background: #957FEF1A;

      .nav-container {
        position: absolute;
        width: 100%;
        z-index: 3;
        .nav {
          display: flex;
          justify-content: space-around;
          align-content: center;
          height: 110px;
          margin-left: 16px;
          margin-right: 30px;
          margin-top: -55px;
          border-radius: 5px;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
          background-color: white;

          .perk-type {
            align-items: center;
            display: flex;
            flex-direction: column;
            width: 90px;
            margin-top: 15px;

            .perk-name {
              font-size: 12px;
              line-height: 16px;
              text-align: center;
              margin-top: 8px;
            }
          }
        }
      }
    }
  }

  .promotion-nav {
    background-image: url('../assets/images/beauty-perks/promo-nav.svg');
  }

  .offer-nav {
    background-image: url('../assets/images/beauty-perks/offer-nav.svg');
  }

  .beautyPass-nav {
    background-image: url('../assets/images/beauty-perks/bp-nav.svg');
  }

  .perk-image-container {
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #957FEF;

    .perk-image {
      width: 22px;
      height: 24px;
      margin: auto;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  .active {
    .promotion-nav {
      background-image: url('../assets/images/beauty-perks/promo-active.svg');
    }

    .offer-nav {
      background-image: url('../assets/images/beauty-perks/offer-active.svg');
    }

    .beautyPass-nav {
      background-image: url('../assets/images/beauty-perks/bp-active.svg');
    }

    .perk-image-container {
      background-color: #957FEF;
    }

    .perk-name {
      font-weight: 700;
      color: #957FEF;
    }
  }
</style>