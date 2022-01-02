<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style lang="less" scoped>
.app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
</style>