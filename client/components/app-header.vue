<template>
  <div class="app-header">
    <a-menu v-model="current" mode="horizontal" @click="onClick">
      <a-menu-item v-for="menu in menus" :key="menu.name">
        <div class="menu-item">
          <a-icon :type="menu.meta.icon" />
          <span>{{ menu.meta.title }}</span>
        </div>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { routes } from "../route";
import { Logout } from "@/apis/index";
export default {
  name: "app-header",
  data() {
    return {
      current: [],
    };
  },
  computed: {
    ...mapGetters(['userRoles']),
    visible() {
      return menus.some((route) => {
        return route.name === this.$router.currentRoute.name;
      });
    },
    menus() {
      const userRoles = this.userRoles;
      const result = routes.filter(route => {
        if (route.meta.roles) {
          return route.meta.roles.some(elem => userRoles.includes(elem));
        }
        return true;
      });
      return result;
    }
  },
  watch: {

  },
  methods: {
    logout() {
      Logout()
        .then(() => {
          window.location.href = "http://localhost:8088/index.html";
        })
        .catch(() => {
          this.$message.error("退出登录失败");
        });
    },
    goHome() {
      this.$router.push({
        name: "Home",
      });
    },
    goAuth() {},
    onClick({ key }) {
      if (this.$router.currentRoute.name !== key) {
        this.$router.push({
          name: key,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.app-header {
  display: flex;
  justify-content: center;
  align-items: center;
  .menu-item {
    display: flex;
    align-items: center;
    i {
      font-size: 18px;
    }
  }
}
</style>