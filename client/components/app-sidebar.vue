<template>
  <div class="app-sidebar" v-if="visible">
    <ul class="nav flex-column nav-pills">
      <li
        class="nav-item"
        v-for="(menu, index) in routes"
        :key="index"
        @click="goto(menu)"
      >
        <button
          type="button"
          class="btn"
          :class="{ 'btn-primary': $route.name === menu.name }"
        >
          {{ menu.meta.title }}
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { routes } from "../route";
export default {
  name: "app-sidebar",
  data() {
    return {
      routes: routes,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
    visible() {
      return routes.some((route) => {
        return route.name === this.$route.name
      });
    }
  },
  methods: {
    goto(menu) {
      if (this.$route.name !== menu.name) {
        this.$router.push({
          name: menu.name,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.app-sidebar {
  width: 256px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 16px 0;
  padding-right: 16px;
  background: #fee;
  ul {
    border: none;
    width: 100%;
    li {
      width: 100%;
      button {
        width: 100%;
        text-align: start;
        outline: none;
        &:focus{
          border: none;
          box-shadow: none;
        }
      }
    }
  }
}
</style>