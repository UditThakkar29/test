<template>
  <div class="promotions">
    <div class="promotion-container">
      <ul class="promotion-list">
        <li class="promotion-card" v-for="(promotion, index) in filteredPromotions">
          <Card :beautyPerk="promotion" :card-index="index" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, useStore } from 'vue';

  name: 'Promotions'
  const showFilter = ref(false)
  // const store = useStore()
  const filterTypes = [
    {
      name: 'points_bonus',
      title: 'Bonus Points'
    },
    {
      name: 'fixed_discount',
      title: 'Discounts'
    },
    {
      name: 'product_giveaway',
      title: 'Gift With Purchases'
    }
  ]

  const fetchPromos = async () => {
    await this.$store.dispatch('fetchPromotions')
  }
  onMounted(fetchPromos);
  const promotions = ref(store.state.promotions)
  const filters = ref(store.state.filters)

  function toggleFilter () {
    showFilter.value = !showFilter.value 
  }

  function filteredPromotions () {
    // const store = useStore();
    if (filters.value.length > 0) {
      return promotions.value.filter(promotion => filters.value.map(filter => filter).includes(promotion.type))
    } else {
      return promotions.value
    }
  }

</script>

<style lang="scss" scoped>
  .promotions {
    padding: 74px 16px 16px 16px;

    .promotion-container {
      position: relative;
      top: 15px;

      li.promotion-card {
        height: fit-content;
        left: 4.27%;
        right: 4.27%;
        background: white;
        margin-bottom: 16px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
      }
    }
  }
</style>