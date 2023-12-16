"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const services_ajax = require("./services/ajax.js");
const services_store = require("./services/store.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/index/index.js";
  "./pages/MaintainTaskReceive/MaintainTaskReceive.js";
  "./pages/test/test.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/Codes/WaterSupply/wechatApp/wechat/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.config.globalProperties.$ajax = services_ajax.ajax;
  app.use(services_store.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
