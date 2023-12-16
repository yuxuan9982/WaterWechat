"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state() {
    return {
      // 当前登录用户
      user: {}
    };
  },
  mutations: {
    // 设置当前登录用户
    login(state, user) {
      state.user = user;
      common_vendor.index.setStorageSync("user", JSON.stringify(user));
      common_vendor.index.setStorageSync("userId", user.id);
    },
    // 登出
    logout(state) {
      state.user = {};
      common_vendor.index.removeStorageSync("user");
      common_vendor.index.removeStorageSync("userId");
      common_vendor.index.removeStorageSync("departmentId");
      common_vendor.index.removeStorageSync("token");
    }
  },
  actions: {},
  modules: {}
});
exports.store = store;
