"use strict";
const uni_modules_zbTable_components_zbTable_js_summary = require("../js/summary.js");
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  mixins: [uni_modules_zbTable_components_zbTable_js_summary.summary]
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.fixedLeftColumns, (item, index, i0) => {
      return {
        a: common_vendor.t(_ctx.sums[index]),
        b: `${item.width ? item.width : "100"}px`,
        c: item.align || "left",
        d: `15255966555${index}`
      };
    }),
    b: `${_ctx.border ? "1px solid #e8e8e8" : ""}`
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cb3e3a28"], ["__file", "G:/Codes/WaterSupply/wechatApp/wechat/uni_modules/zb-table/components/zb-table/components/table-side-summary.vue"]]);
wx.createComponent(Component);
