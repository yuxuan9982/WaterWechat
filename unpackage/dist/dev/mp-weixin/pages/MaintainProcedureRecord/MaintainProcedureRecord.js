"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_MaintainProcedureRecord_RecordData = require("./RecordData.js");
const _sfc_main = {
  data() {
    return {
      tabsList: [{ name: "相关任务" }, { name: "所有任务" }],
      tabsIndex: 0,
      column1: [
        { name: "taskInfo", label: "维护任务", width: 100, fixed: true },
        { name: "maintainType", label: "维护类型", width: 80 },
        { name: "pickupTime", label: "领取时间", width: 100 },
        { name: "endTime", label: "截止时间", width: 100 },
        { name: "currentProgress", label: "截止时间", width: 150 },
        { name: "maintainOverview", label: "维护概述", width: 150 },
        { name: "operation", type: "operation", label: "操作", width: 220, renders: [
          {
            name: "转交",
            type: "primary",
            func: "trans"
            // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
          },
          {
            name: "维护",
            type: "primary",
            // type 为custom的时候自定义按钮
            func: "maintain"
          },
          {
            name: "完成",
            type: "primary",
            // type 为custom的时候自定义按钮
            func: "complete"
          }
        ] }
      ],
      column2: [
        { name: "taskInfo", label: "维护任务", width: 100, fixed: true },
        { name: "maintenancePersonnel", label: "维护人员", width: 100, fixed: true },
        { name: "maintainType", label: "维护类型", width: 80 },
        { name: "pickupTime", label: "领取时间", width: 100 },
        { name: "endTime", label: "截止时间", width: 100 },
        { name: "currentProgress", label: "截止时间", width: 150 },
        { name: "maintainOverview", label: "维护概述", width: 150 },
        { name: "operation", type: "operation", label: "操作", width: 200, renders: [
          {
            name: "查看维护信息",
            type: "primary",
            func: "showDetail"
            // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
          }
        ] }
      ],
      dataSelf: [],
      dataAll: [],
      pageSize: 9,
      // 当前页
      pageCurrent: 1,
      // 数据总量
      total: 0,
      pageSize2: 9,
      // 当前页
      pageCurrent2: 1,
      // 数据总量
      total2: 0
    };
  },
  onLoad() {
    this.getData(1);
    this.getData2(1);
  },
  methods: {
    tabsClick(item) {
      this.tabsIndex = item.index;
      console.log(this.tabsIndex);
    },
    // 分页触发
    change(e) {
      this.$refs.tableSelf.clearSelection();
      this.getData(e.current);
    },
    // 搜索
    search() {
      this.getData(1, this.searchVal);
    },
    // 获取数据
    getData(pageCurrent, value = "") {
      this.pageCurrent = pageCurrent;
      this.request({
        pageSize: this.pageSize,
        pageCurrent,
        value,
        success: (res) => {
          this.dataSelf = res.data;
          this.total = res.total;
        }
      });
    },
    //伪request请求
    request(options) {
      const { pageSize, pageCurrent, success, value } = options;
      let total = pages_MaintainProcedureRecord_RecordData.RecordData.length;
      let data = pages_MaintainProcedureRecord_RecordData.RecordData.filter((item, index) => {
        const idx = index - (pageCurrent - 1) * pageSize;
        return idx < pageSize && idx >= 0;
      });
      if (value) {
        data = [];
        pages_MaintainProcedureRecord_RecordData.RecordData.forEach((item) => {
          if (item.name.indexOf(value) !== -1) {
            data.push(item);
          }
        });
        total = data.length;
      }
      setTimeout(() => {
        typeof success === "function" && success({
          data,
          total
        });
      }, 500);
    },
    // 分页触发
    change2(e) {
      this.$refs.tableAll.clearSelection();
      this.getData2(e.current);
    },
    // 搜索
    search2() {
      this.getData2(1, this.searchVal);
    },
    // 获取数据
    getData2(pageCurrent, value = "") {
      this.pageCurrent2 = pageCurrent;
      this.request({
        pageSize: this.pageSize2,
        pageCurrent,
        value,
        success: (res) => {
          this.dataAll = res.data;
          this.total2 = res.total;
        }
      });
    },
    showDetail(ite, index) {
      common_vendor.index.showToast({
        icon: "none",
        duration: 3e3,
        title: "查看维护信息"
      });
      console.log(ite, index);
    },
    trans(ite, index) {
      common_vendor.index.showToast({
        icon: "none",
        duration: 3e3,
        title: "转交"
      });
      console.log(ite, index);
    },
    maintain(ite, index) {
      common_vendor.index.showToast({
        icon: "none",
        duration: 3e3,
        title: "维护"
      });
      console.log(ite, index);
    },
    complete(ite, index) {
      common_vendor.index.showToast({
        icon: "none",
        duration: 3e3,
        title: "完成"
      });
      console.log(ite, index);
    }
  }
};
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_zb_table2 = common_vendor.resolveComponent("zb-table");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  (_easycom_u_tabs2 + _easycom_zb_table2 + _easycom_uni_pagination2)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_zb_table = () => "../../uni_modules/zb-table/components/zb-table/zb-table.js";
const _easycom_uni_pagination = () => "../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_zb_table + _easycom_uni_pagination)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.tabsClick),
    b: common_vendor.p({
      list: $data.tabsList
    }),
    c: common_vendor.sr("tableSelf", "38046e5a-1"),
    d: common_vendor.o($options.trans),
    e: common_vendor.o($options.maintain),
    f: common_vendor.o($options.complete),
    g: $data.tabsIndex === 0,
    h: common_vendor.p({
      border: true,
      stripe: true,
      columns: $data.column1,
      data: $data.dataSelf
    }),
    i: common_vendor.o($options.change),
    j: $data.tabsIndex === 0,
    k: common_vendor.p({
      ["show-icon"]: true,
      ["page-size"]: $data.pageSize,
      current: $data.pageCurrent,
      total: $data.total
    }),
    l: common_vendor.sr("tableAll", "38046e5a-3"),
    m: common_vendor.o($options.showDetail),
    n: $data.tabsIndex === 1,
    o: common_vendor.p({
      border: true,
      stripe: true,
      columns: $data.column2,
      data: $data.dataAll
    }),
    p: common_vendor.o($options.change2),
    q: $data.tabsIndex === 1,
    r: common_vendor.p({
      ["show-icon"]: true,
      ["page-size"]: $data.pageSize2,
      current: $data.pageCurrent2,
      total: $data.total2
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/Codes/WaterSupply/wechatApp/wechat/pages/MaintainProcedureRecord/MaintainProcedureRecord.vue"]]);
wx.createPage(MiniProgramPage);
