<template>
  <div class="app-header">
    <a-menu :selectedKeys="current" mode="horizontal" @click="onClick">
      <a-menu-item v-for="menu in menus" :key="menu.name">
        <div class="menu-item">
          <a-icon :type="menu.meta.icon" />
          <span>{{ menu.meta.title }}</span>
        </div>
      </a-menu-item>
    </a-menu>
    <a-dropdown :trigger="['click']">
      <a-avatar :size="32" icon="user" class="avatar" />
      <a-menu slot="overlay" style="width: 150px; margin-top: 20px">
        <a-menu-item>
          <a href="javascript:;">个人资料</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">账号设置</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" @click="logout">退出</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { routes } from "../route";
import { Logout } from "@/apis/index";
import { UserInfoKey } from "@/store/types";
export default {
  name: "app-header",
  data() {
    return {
      current: [],
    };
  },
  computed: {
    ...mapGetters(["userRoles"]),
    visible() {
      return menus.some((route) => {
        return route.name === this.$router.currentRoute.name;
      });
    },
    menus() {
      const userRoles = this.userRoles;
      const result = routes.filter((route) => {
        if (route.meta.roles) {
          return route.meta.roles.some((elem) => userRoles.includes(elem));
        }
        return true;
      });
      return result;
    },
  },
  methods: {
    logout() {
      Logout()
        .then(() => {
          window.sessionStorage.clear(UserInfoKey);
          this.$router.push({
            name: "Login",
          });
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
        this.current = [key];
        this.$router.push({
          name: key,
        });
      }
    },
  },
  mounted() {
    window.addEventListener("load", () => {
      const name = this.$router.currentRoute.name;
      this.current = [name];
    });
  },
};
</script>
<style lang="less" scoped>
.app-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .menu-item {
    display: flex;
    align-items: center;
    i {
      font-size: 18px;
    }
  }
  .avatar {
    cursor: pointer;
    background: #eee;
    position: absolute;
    right: 24px;
  }
}
</style>