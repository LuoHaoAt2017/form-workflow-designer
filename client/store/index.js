import Vue from "vue";
import Vuex from "vuex";
import { SetUserInfo } from "./types";
import { GetUserInfo } from "../apis";
import authRouterPlugin from '@/plugins/auth-router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: {}
  },
  getters: {
    userRoles(state) {
      return state.userInfo.roles || [];
    }
  },
  mutations: {
    SetUserInfo(state, payload) {
      state.userInfo = payload;
    },
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
    authRouterPlugin
  ]
});

export default store;