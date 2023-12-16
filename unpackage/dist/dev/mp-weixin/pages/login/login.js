"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      user: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "用户名必填", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码必填", trigger: "blur" }
        ]
      }
    };
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  methods: {
    submit() {
      let self = this;
      self.$ajax.postjson("/user/login", {
        loginName: self.user.userName,
        password: self.user.password
      }).then((res) => {
        if (res.success) {
          console.log(res);
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem(
            "departmentId",
            res.data.departmentId != null ? res.data.departmentId : -1
          );
          var user = res.data.user;
          user["authorities"] = res.data.authorities;
          console.log(user);
          this.$store.commit("login", user);
          console.log("登录成功·");
        } else {
          console.log("登录失败，请检查用户名和密码!");
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.user.userName = $event),
    b: common_vendor.p({
      placeholder: "请输入账号",
      modelValue: $data.user.userName
    }),
    c: common_vendor.p({
      label: "账号",
      required: true,
      name: "userName"
    }),
    d: common_vendor.o(($event) => $data.user.password = $event),
    e: common_vendor.p({
      placeholder: "请输入密码",
      modelValue: $data.user.password
    }),
    f: common_vendor.p({
      label: "密码",
      required: true,
      name: "password"
    }),
    g: common_vendor.sr("form", "41c0e31a-0"),
    h: common_vendor.p({
      modelValue: $data.user
    }),
    i: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/Codes/WaterSupply/wechatApp/wechat/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
