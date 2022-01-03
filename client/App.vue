<template>
  <div class="app">
    <app-header></app-header>
    <app-content>
      <router-view></router-view>
    </app-content>
  </div>
</template>
<script>
import AppHeader from "./components/app-header.vue";
import AppContent from "./components/app-content.vue";
export default {
  name: "App",
  components: {
    AppHeader,
    AppContent,
  },
};
</script>
<style lang="less">
h3, h4, h5, h6 {
  text-align: center;
}
</style>
<style lang="less" scoped>
.app {
  background: #eee;
  height: 100%;
  box-sizing: border-box;
  .app-header {
    padding: 0 16px;
    background: #fff;
    height: 54px;
    line-height: 54px;
  }
  .app-content {
    height: calc(100% - 54px - 32px);
    min-height: 320px;
    padding: 16px 16px;
    margin: 16px 16px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 4px;
  }
}
</style>