import Vue from "vue";
import Vuex from "vuex";
import { SetUserInfo, RestoreUser, UserInfoKey } from "./types";
import { GetUserInfo } from "../apis";
import authRouterPlugin from '@/plugins/auth-router';
import restoreUserPlugin from '@/plugins/restore-user';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: {}
  },
  getters: {
    userRoles(state) {
      const roles = state.userInfo.roles || [];
      return roles.map(elem => elem.role_name);
    }
  },
  mutations: {
    [SetUserInfo](state, payload) {
      state.userInfo = payload;
      window.sessionStorage.setItem(UserInfoKey, JSON.stringify(payload));
    },
    [RestoreUser](state) {
      const user = window.sessionStorage.getItem(UserInfoKey);
      if (user) {
        state.userInfo = JSON.parse(user);
      }
    }
  },
  actions: {
    async getUserInfo({ commit }, userId) {
      try {
        const res = await GetUserInfo(userId);
        const user = res.data;
        commit(SetUserInfo, user);
      } catch {
        console.error("获取用户信息失败");
      }
    },
  },
  plugins: [
    restoreUserPlugin,
    authRouterPlugin
  ]
});

export default store;