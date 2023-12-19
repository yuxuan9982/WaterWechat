"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_MaintainProcedureRecord_RecordData = require("./RecordData.js");
const _sfc_main = {
  data() {
    return {
      tabsList: [{ name: "相关任务" }, { name: "所有任务" }],
      tabsIndex: 0,
      showAllDetail: false,
      showTransfer: false,
      showComplete: false,
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
        { name: "taskInfo", label: "维护任务", width: 80, fixed: true },
        { name: "maintenancePersonnel", label: "维护人员", width: 80, fixed: true },
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
      maintainItemList: [
        {
          name: "维护项目1",
          content: "设备清洁",
          maintainData: "维护数据1",
          finishSituation: "完成"
        },
        {
          name: "维护项目2",
          content: "设备故障维护",
          maintainData: "维护数据2",
          finishSituation: "完成"
        },
        {
          name: "维护项目3",
          content: "维护内容3",
          maintainData: "维护数据3",
          finishSituation: "完成"
        },
        {
          name: "维护项目4",
          content: "维护内容4",
          maintainData: "维护数据4",
          finishSituation: "完成"
        }
      ],
      maintainItemColumns: [
        { name: "name", label: "维护项目", width: 100, fixed: true },
        { name: "content", label: "维护项目内容", width: 150, fixed: true },
        { name: "finishSituation", label: "完成情况", width: 100 }
      ],
      transferer: {
        name: "",
        reason: ""
      },
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
        duration: 500,
        title: "查看维护信息"
      });
      console.log(ite, index);
      this.showAllDetail = true;
    },
    trans(ite, index) {
      common_vendor.index.showToast({
        icon: "none",
        duration: 500,
        title: "转交"
      });
      console.log(ite, index);
      this.showTransfer = true;
    },
    maintain(ite, index) {
      common_vendor.index.showToast({
        icon: "none",
        duration: 1e3,
        title: "维护"
      });
      console.log(ite, index);
    },
    complete(ite, index) {
      common_vendor.index.showToast({
        icon: "none",
        duration: 500,
        title: "完成"
      });
      console.log(ite, index);
      this.showComplete = true;
    },
    confirmAllDetail() {
      this.showAllDetail = false;
    },
    confirmTransfer() {
      this.showTransfer = false;
    },
    cancelTransfer() {
      this.showTransfer = false;
    },
    confirmComplete() {
      this.showComplete = false;
    },
    cancelComplete() {
      this.showComplete = false;
    }
  }
};
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_zb_table2 = common_vendor.resolveComponent("zb-table");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_u_tabs2 + _easycom_zb_table2 + _easycom_uni_pagination2 + _easycom_u_modal2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_zb_table = () => "../../uni_modules/zb-table/components/zb-table/zb-table.js";
const _easycom_uni_pagination = () => "../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
const _easycom_u_modal = () => "../../uni_modules/uview-plus/components/u-modal/u-modal.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_zb_table + _easycom_uni_pagination + _easycom_u_modal + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
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
      fit: true,
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
      fit: true,
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
    }),
    s: common_vendor.sr("tableAllDetail", "38046e5a-6,38046e5a-5"),
    t: common_vendor.p({
      fit: true,
      border: true,
      stripe: true,
      columns: $data.maintainItemColumns,
      data: $data.maintainItemList
    }),
    v: common_vendor.o($options.confirmAllDetail),
    w: common_vendor.p({
      show: $data.showAllDetail,
      title: "维护项目详情"
    }),
    x: common_vendor.o(($event) => $data.transferer.name = $event),
    y: common_vendor.p({
      placeholder: "请输入转交对象",
      modelValue: $data.transferer.name
    }),
    z: common_vendor.p({
      label: "转交对象",
      required: true
    }),
    A: common_vendor.o(($event) => $data.transferer.reason = $event),
    B: common_vendor.p({
      type: "password",
      placeholder: "请输入转交理由",
      modelValue: $data.transferer.reason
    }),
    C: common_vendor.p({
      label: "转交理由"
    }),
    D: common_vendor.sr("form", "38046e5a-8,38046e5a-7"),
    E: common_vendor.p({
      modelValue: _ctx.tranferer,
      ["label-width"]: "100px"
    }),
    F: common_vendor.o($options.confirmTransfer),
    G: common_vendor.o($options.cancelTransfer),
    H: common_vendor.p({
      show: $data.showTransfer,
      title: "转交维护项目",
      showCancelButton: "true"
    }),
    I: common_vendor.o($options.confirmComplete),
    J: common_vendor.o($options.cancelComplete),
    K: common_vendor.p({
      show: $data.showComplete,
      title: "完成维护项目",
      showCancelButton: "true"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/Codes/WaterSupply/wechatApp/wechat/pages/MaintainProcedureRecord/MaintainProcedureRecord.vue"]]);
wx.createPage(MiniProgramPage);
