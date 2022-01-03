<template>
  <div class="app-loading">
    <a-spin v-if="loading">
      <a-icon slot="indicator" type="loading" style="font-size: 48px" spin />
    </a-spin>
    <slot v-else></slot>
  </div>
</template>
<script>
export default {
  name: "app-loading",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="less">
.app-loading {
  height: 100%;
  margin: 0 auto;
}
</style>
<style lang="less" scoped>
.app-loading {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
</style>