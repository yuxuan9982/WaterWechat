"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  (_easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2)();
}
const _easycom_uni_th = () => "../../../uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../../uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../../uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../../uni-table/components/uni-table/uni-table.js";
if (!Math) {
  (_easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table)();
}
const _sfc_main = {
  __name: "th-table",
  props: {
    stripe: Boolean,
    border: Boolean,
    column: Array,
    listData: Array,
    checkSort: Function,
    tdClick: Function,
    st: String,
    sr: Number,
    loading: Boolean,
    height: String,
    type: String,
    tdsize: Number,
    thsize: Number
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.column, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.n(item.isSort ? "span" : ""),
            c: item.isFixed ? "sticky" : "",
            d: item.fixedW || 0,
            e: item.isFixed ? "1" : "",
            f: `${item.width * 100}rpx`,
            g: common_vendor.n(item.isSort ? "sortDefault" : ""),
            h: common_vendor.n(item.key == __props.st ? __props.sr == -1 ? "sortBottom" : "sortTop" : ""),
            i: common_vendor.o(($event) => item.isSort ? __props.checkSort(item.key, item.key === __props.st ? __props.sr === -1 ? 1 : -1 : -1) : ""),
            j: "fba9d2bb-2-" + i0 + ",fba9d2bb-1",
            k: common_vendor.p({
              align: item.align || "center"
            })
          };
        }),
        b: __props.thsize ? __props.thsize + "rpx" : "26rpx",
        c: common_vendor.f(__props.listData, (item, k0, i0) => {
          return {
            a: common_vendor.f(__props.column, (item1, index, i1) => {
              return common_vendor.e({
                a: item1.slot
              }, item1.slot ? {
                b: common_vendor.d(item1.slot),
                c: common_vendor.r(common_vendor.d(item1.slot), {
                  item
                }, i0 + "-" + i1)
              } : {
                d: common_vendor.t(item[item1.key] ? item[item1.key] : "-")
              }, {
                e: index,
                f: item1.isFixed ? "sticky" : "",
                g: item1.fixedW || 0,
                h: item1.isFixed ? "1" : "",
                i: common_vendor.o(($event) => __props.tdClick ? __props.tdClick(item) : "", index),
                j: "fba9d2bb-4-" + i0 + "-" + i1 + "," + ("fba9d2bb-3-" + i0)
              });
            }),
            b: common_vendor.p({
              align: item.align || "center"
            }),
            c: item.SECURITY_CODE,
            d: "fba9d2bb-3-" + i0 + ",fba9d2bb-0"
          };
        }),
        d: `${__props.height * 100}rpx`,
        e: __props.tdsize ? __props.tdsize + "rpx" : "",
        f: common_vendor.p({
          loading: __props.loading,
          border: __props.border,
          stripe: __props.stripe,
          emptyText: _ctx.emptyText ? _ctx.emptyText : "暂无更多数据",
          type: __props.type
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fba9d2bb"], ["__file", "G:/Codes/WaterSupply/wechatApp/wechat/uni_modules/th-table/components/th-table/th-table.vue"]]);
wx.createComponent(Component);
