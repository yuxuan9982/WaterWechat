"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_MaintainTaskReceive_tableData = require("./tableData.js");
const _sfc_main = {
  data() {
    return {
      expanded: false,
      searchVal: "",
      tableData1: [],
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
        },
        {
          name: "维护项目2",
          content: "设备故障维护"
        },
        {
          name: "维护项目3",
          content: "维护内容3"
        },
        {
          name: "维护项目4",
          content: "维护内容4"
        }
      ],
      column1: [
        // { type:'index', width:60 },
        { name: "taskName", label: "维护任务", width: 100 },
        { name: "customerName", label: "客户", width: 120 },
        { name: "maintainType", label: "维护类型", width: 100 },
        { name: "operation", type: "operation", label: "操作", width: 100, renders: [
          {
            name: "详情",
            class: "edit",
            type: "primary",
            func: "edit"
            // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
          },
          {
            name: "认领",
            type: "primary",
            // type 为custom的时候自定义按钮
            class: "del",
            func: "dele"
          }
        ] }
      ]
    };
  },
  onLoad() {
    this.tableData1 = pages_MaintainTaskReceive_tableData.tableData.slice(0, 15);
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
    },
    clickReceive() {
      this.showReceive = true;
    },
    confirm2() {
      this.showReceive = false;
    },
    cancel2() {
      this.showReceive = false;
    },
    dele(ite, index) {
      common_vendor.index.showToast({
        icon: "none",
        duration: 3e3,
        title: "点击认领"
      });
      console.log(ite, index);
      this.showReceive = true;
    },
    buttonEdit(ite, index) {
      common_vendor.index.showToast({
        icon: "none",
        duration: 3e3,
        title: "点击详情"
      });
      console.log(ite, index);
      this.MaintainTask.taskName = ite.taskName;
      this.MaintainTask.maintainType = ite.maintainType;
      this.MaintainTask.customerName = ite.customerName;
      this.showDetail = true;
    },
    pullUpLoadingAction(done) {
      if (this.tableData1.length == pages_MaintainTaskReceive_tableData.tableData.length) {
        return;
      }
      setTimeout(() => {
        this.tableData1.push(pages_MaintainTaskReceive_tableData.tableData[this.tableData1.length]);
        if (this.tableData1.length == pages_MaintainTaskReceive_tableData.tableData.length) {
          this.$refs.table.pullUpCompleteLoading("ok");
        } else {
          this.$refs.table.pullUpCompleteLoading();
        }
      }, 1e3);
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_zb_table2 = common_vendor.resolveComponent("zb-table");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_uni_easyinput2 + _easycom_zb_table2 + _easycom_uni_section2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2 + _easycom_uni_forms2 + _easycom_u_modal2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_zb_table = () => "../../uni_modules/zb-table/components/zb-table/zb-table.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_u_modal = () => "../../uni_modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_zb_table + _easycom_uni_section + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table + _easycom_uni_forms + _easycom_u_modal)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      placeholder: "维护任务查询"
    }),
    b: common_vendor.sr("table", "6d1a1907-2,6d1a1907-1"),
    c: common_vendor.o($options.dele),
    d: common_vendor.o($options.buttonEdit),
    e: common_vendor.o($options.pullUpLoadingAction),
    f: common_vendor.p({
      fit: true,
      border: true,
      stripe: true,
      columns: $data.column1,
      data: $data.tableData1,
      isShowLoadMore: true
    }),
    g: common_vendor.p({
      title: "维护任务表",
      type: "line"
    }),
    h: common_vendor.o(($event) => $data.MaintainTask.taskName = $event),
    i: common_vendor.p({
      disabled: true,
      modelValue: $data.MaintainTask.taskName
    }),
    j: common_vendor.p({
      label: "维护任务"
    }),
    k: common_vendor.o(($event) => $data.MaintainTask.customerName = $event),
    l: common_vendor.p({
      disabled: true,
      modelValue: $data.MaintainTask.customerName
    }),
    m: common_vendor.p({
      label: "客户"
    }),
    n: common_vendor.o(($event) => $data.maintainTypes = $event),
    o: common_vendor.p({
      localdata: $data.maintainTypesData,
      modelValue: $data.maintainTypes
    }),
    p: common_vendor.p({
      label: "维护类型"
    }),
    q: common_vendor.p({
      label: "维护项目列表"
    }),
    r: common_vendor.p({
      width: "300rpx",
      align: "center"
    }),
    s: common_vendor.p({
      width: "300rpx",
      align: "center"
    }),
    t: common_vendor.f($data.maintainListData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: "6d1a1907-17-" + i0 + "," + ("6d1a1907-16-" + i0),
        c: common_vendor.t(item.content),
        d: "6d1a1907-18-" + i0 + "," + ("6d1a1907-16-" + i0),
        e: index,
        f: "6d1a1907-16-" + i0 + ",6d1a1907-12"
      };
    }),
    v: common_vendor.p({
      align: "center"
    }),
    w: common_vendor.p({
      align: "center"
    }),
    x: common_vendor.p({
      border: true,
      stripe: true
    }),
    y: common_vendor.sr("form", "6d1a1907-4,6d1a1907-3"),
    z: common_vendor.p({
      modelValue: $data.MaintainTask,
      ["label-width"]: "100px"
    }),
    A: common_vendor.o($options.confirm1),
    B: common_vendor.p({
      show: $data.showDetail,
      title: "维护任务详情",
      width: "700rpx"
    }),
    C: common_vendor.o($options.confirm2),
    D: common_vendor.o($options.cancel2),
    E: common_vendor.p({
      show: $data.showReceive,
      title: "维护任务领取",
      showCancelButton: "true"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/Codes/WaterSupply/wechatApp/wechat/pages/MaintainTaskReceive/MaintainTaskReceive.vue"]]);
wx.createPage(MiniProgramPage);
