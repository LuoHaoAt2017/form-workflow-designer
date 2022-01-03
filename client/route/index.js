import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("../pages/home.vue"),
    meta: {
      title: "首页",
      icon: "home",
      roles: ["user"],
    },
  },
  {
    path: "/designer",
    name: "Designer",
    component: () => import("../pages/designer.vue"),
    meta: {
      title: "流程设计器",
      icon: "appstore",
      roles: ["admin"],
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../pages/auth.vue"),
    meta: {
      title: "用户权限管理",
      icon: "setting",
      roles: ["admin"],
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/about.vue"),
    meta: {
      title: "关于我们",
      icon: "info-circle",
    },
  },
];

export default new VueRouter({
  mode: "hash",
  routes: [
    ...routes,
    {
      path: "/login",
      name: "Login",
      component: () => import("../pages/login.vue"),
      meta: {
        title: "登录",
      },
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../pages/register.vue"),
      meta: {
        title: "注册",
      },
    },
    {
      path: "/auth-error",
      name: "AuthError",
      component: () => import("../components/auth-error.vue"),
      meta: {
        title: "没有权限",
      },
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});
