"use strict";
const pages_MaintainTaskReceive_tableData = require("./tableData.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchVal: "",
      tableData: [],
      // 每页数据量
      pageSize: 10,
      // 当前页
      pageCurrent: 1,
      // 数据总量
      total: 0,
      loading: false,
      showDetail: false,
      showReceive: false,
      MaintainTask: {
        taskName: "1",
        customerName: "2",
        maintainType: "3"
      },
      maintainTypes: 0,
      maintainTypesData: [{ "value": 0, "text": "线上", "disable": true }, { "value": 1, "text": "线下", "disable": true }],
      maintainListData: [
        {
          name: "维护项目1",
          content: "设备清洁"
        }
        // },{
        //   name:'维护项目2',
        //   content:'设备故障维护',
        // },{
        //   name:'维护项目3',
        //   content:'维护内容3',
        // },{
        //   name:'维护项目4',
        //   content:'维护内容4',
        // }
      ]
    };
  },
  onLoad() {
    this.getData(1);
  },
  methods: {
    // 分页触发
    change(e) {
      this.$refs.table.clearSelection();
      this.getData(e.current);
    },
    // 搜索
    search() {
      this.getData(1, this.searchVal);
    },
    // 获取数据
    getData(pageCurrent, value = "") {
      this.loading = true;
      this.pageCurrent = pageCurrent;
      this.request({
        pageSize: this.pageSize,
        pageCurrent,
        value,
        success: (res) => {
          this.tableData = res.data;
          this.total = res.total;
          this.loading = false;
        }
      });
    },
    //伪request请求
    request(options) {
      const { pageSize, pageCurrent, success, value } = options;
      let total = pages_MaintainTaskReceive_tableData.tableData.length;
      let data = pages_MaintainTaskReceive_tableData.tableData.filter((item, index) => {
        const idx = index - (pageCurrent - 1) * pageSize;
        return idx < pageSize && idx >= 0;
      });
      if (value) {
        data = [];
        pages_MaintainTaskReceive_tableData.tableData.forEach((item) => {
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
    clickDetail() {
      this.showDetail = true;
    },
    confirm1() {
      this.showDetail = false;
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_uni_easyinput2 + _easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2 + _easycom_uni_pagination2 + _easycom_uni_section2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2 + _easycom_u_modal2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
const _easycom_uni_pagination = () => "../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_u_modal = () => "../../uni_modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table + _easycom_uni_pagination + _easycom_uni_section + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_forms + _easycom_u_modal)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      placeholder: "维护任务查询"
    }),
    b: common_vendor.p({
      width: "100",
      align: "center"
    }),
    c: common_vendor.p({
      width: "80",
      align: "center"
    }),
    d: common_vendor.p({
      width: "150",
      align: "center"
    }),
    e: common_vendor.f($data.tableData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.taskName),
        b: "6d1a1907-8-" + i0 + "," + ("6d1a1907-7-" + i0),
        c: common_vendor.t(item.maintainType),
        d: "6d1a1907-9-" + i0 + "," + ("6d1a1907-7-" + i0),
        e: common_vendor.o((...args) => $options.clickDetail && $options.clickDetail(...args), index),
        f: "6d1a1907-10-" + i0 + "," + ("6d1a1907-7-" + i0),
        g: index,
        h: "6d1a1907-7-" + i0 + ",6d1a1907-2"
      };
    }),
    f: common_vendor.p({
      align: "center"
    }),
    g: common_vendor.p({
      align: "center"
    }),
    h: common_vendor.p({
      align: "center"
    }),
    i: common_vendor.sr("table", "6d1a1907-2,6d1a1907-1"),
    j: common_vendor.p({
      loading: $data.loading,
      border: true,
      stripe: true,
      emptyText: "暂无更多数据"
    }),
    k: common_vendor.o($options.change),
    l: common_vendor.p({
      ["show-icon"]: true,
      ["page-size"]: $data.pageSize,
      current: $data.pageCurrent,
      total: $data.total
    }),
    m: common_vendor.p({
      title: "维护任务表",
      type: "line"
    }),
    n: common_vendor.o(($event) => $data.MaintainTask.taskName = $event),
    o: common_vendor.p({
      disabled: true,
      modelValue: $data.MaintainTask.taskName
    }),
    p: common_vendor.p({
      label: "维护任务"
    }),
    q: common_vendor.o(($event) => $data.MaintainTask.customerName = $event),
    r: common_vendor.p({
      disabled: true,
      modelValue: $data.MaintainTask.customerName
    }),
    s: common_vendor.p({
      label: "客户"
    }),
    t: common_vendor.p({
      label: "维护项目列表"
    }),
    v: common_vendor.p({
      width: "100",
      align: "center"
    }),
    w: common_vendor.p({
      width: "100",
      align: "center"
    }),
    x: common_vendor.f($data.maintainListData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: "6d1a1907-24-" + i0 + "," + ("6d1a1907-23-" + i0),
        c: common_vendor.t(item.content),
        d: "6d1a1907-25-" + i0 + "," + ("6d1a1907-23-" + i0),
        e: index,
        f: "6d1a1907-23-" + i0 + ",6d1a1907-19"
      };
    }),
    y: common_vendor.p({
      align: "center"
    }),
    z: common_vendor.p({
      align: "center"
    }),
    A: common_vendor.p({
      border: true,
      stripe: true,
      emptyText: "暂无更多数据"
    }),
    B: common_vendor.o($options.change),
    C: common_vendor.o(($event) => $data.maintainTypes = $event),
    D: common_vendor.p({
      localdata: $data.maintainTypesData,
      modelValue: $data.maintainTypes
    }),
    E: common_vendor.p({
      label: "维护类型"
    }),
    F: common_vendor.sr("form", "6d1a1907-13,6d1a1907-12"),
    G: common_vendor.p({
      modelValue: $data.MaintainTask
    }),
    H: common_vendor.o($options.confirm1),
    I: common_vendor.p({
      show: $data.showDetail,
      title: "维护任务详情",
      width: "90%"
    }),
    J: common_vendor.p({
      show: $data.showReceive,
      title: "维护任务领取"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/Codes/WaterSupply/wechatApp/wechat/pages/MaintainTaskReceive/MaintainTaskReceive.vue"]]);
wx.createPage(MiniProgramPage);
