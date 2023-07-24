<template>
  <div class="card-container">
    <div class="ticket-shaper">
      <div class="circler" v-for="i in 8"></div>
    </div>
    <div class="card">
      <div class="gift-icon">
        include ../assets/images/beauty-perks/gift-icon.svg
      </div>
      <div class="content">
        <div class="name">{{ beautyPerk.name }}</div>
        <CouponCode :beautyPerk="beautyPerk" @copy-code="handleCopyCode"/>
        <div class="discription"> {{ beautyPerk.description }} </div>
        <div class="validity"> {{ beautyPerks.validTill }} </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    beautyPerk: { type: Object, default: () => {} }
  })

  function handleCopyCode () {
    $emit('copy-coupon-code')
  }
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-direction: row;
  background: #f7f7f7;
}
  .ticket-shaper {
    display: flex;
    flex-direction: column;
    width: 16px;
    height: 100%;
    z-index: 2;
    margin-left: -8px;
  }
  .circler {
    width: 16px;
    height: 16px;
    background: #f7f7f7;
    border-radius: 50%;
    margin-top: 6px;
  }
  .card {
    display: flex;
    flex-direction: row;
    z-index: 1;
    margin-left: -8px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
    border: none;
    width: 100%;

    .gift-icon {
      width: 10%;
      margin-top: 18px;
      margin-left: 20px;
    }

    .content {
      margin: 16px;

      .name {
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.369231px;
        text-transform: uppercase;
      }

      .description {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        max-height: 40px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.3px;
        margin: 8px 0;
      }

      .validity {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.3px;
        margin: 8px 0;
      }
    }
  }
</style>