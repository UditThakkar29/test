<template>
  <div class="perk-header">
    <div class="back-btn" @click="back"></div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    backToHome: {
      type: Boolean,
      default: false
    }
  });

  function back () {
    if (backToHome) return false
  }
</script>

<style lang="scss" scoped>
  .perk-header {
    position: sticky;
    top: 0;
    display: flex;
    padding: 18px 20px;
    color: white;
    background-color: black;
    text-transform: uppercase;
    z-index: 5;

    > .back-btn {
      cursor: pointer;
      position: absolute;
      height: 20px;
      width: 20px;
      background-image: url('../assets/images/icons/chevron-left-white.svg');
    }
    > .title {
      font-weight: bold;
      font-size: 16px;
      margin: 0 auto;
    }
  }
</style>