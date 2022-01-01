import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/home",
      name: "Home",
      component: () => import("../pages/home.vue"),
      meta: {
        title: "首页",
        roles: ["user"],
      },
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../pages/about.vue"),
      meta: {
        title: "关于",
      },
    },
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
        title: "登录",
      },
    },
    {
      path: "/designer",
      name: "Designer",
      component: () => import("../pages/designer.vue"),
      meta: {
        title: "设计器",
        roles: ["admin"],
      },
    },
    {
      path: "/auth-error",
      name: "AuthError",
      component: () => import("../components/auth-error.vue"),
      meta: {
        title: "没有权限"
      },
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
