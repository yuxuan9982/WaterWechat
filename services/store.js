import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      // 当前登录用户
      user: {},
    };
  },
  mutations: {
    // 设置当前登录用户
    login(state, user) {
      state.user = user;
      // 用户存储在sessionStorage中
      uni.setStorageSync("user", JSON.stringify(user));
      uni.setStorageSync("userId", user.id);
      // uni.setStorageSync("departmentId", user.department != null ? user.department.root.id : -1);
    },
    // 登出
    logout(state) {
      state.user = {};
      uni.removeStorageSync("user");
      uni.removeStorageSync("userId");
      uni.removeStorageSync("departmentId");
      uni.removeStorageSync("token");
    }
  },
  actions: {

  },
  modules: {

  }
})
