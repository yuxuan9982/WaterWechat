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
      showOpen: false,
      num1: 0,
      MaintainTask: {
        taskName: "维护任务1",
        maintenancePersonnel: "工程师A",
        maintainType: "线上",
        pickupTime: "2023-10-01",
        endTime: "2023-11-01",
        currentProgress: "任务待被领取",
        maintainOverview: "设备常规检查",
        comment: "按要求完成"
      },
      column1: [
        { name: "taskName", label: "维护任务", width: 100, fixed: true },
        // { name: 'maintainType', label: '维护类型',width:80},
        // { name: 'pickupTime', label: '领取时间',width:100},
        // { name: 'endTime', label: '截止时间',width:100},
        // { name: 'currentProgress', label: '截止时间',width:150},
        // { name: 'maintainOverview', label: '维护概述',width:150},
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
          },
          {
            name: "展开",
            type: "custom",
            // type 为custom的时候自定义按钮
            class: "custom",
            func: "open"
          }
        ] }
      ],
      mycolumn1: [
        { key: "taskName", title: "维护任务" },
        { key: "maintainType", title: "维护类型" },
        { key: "maintainOverview", title: "维护概述" }
        // {
        //     title: "操作",
        //     key: "action",
        //     type: "action"
        // }
      ],
      column2: [
        { name: "taskName", label: "维护任务", width: 80, fixed: true },
        { name: "maintenancePersonnel", label: "维护人员", width: 80, fixed: true },
        // { name: 'maintainType', label: '维护类型',width:80},
        // { name: 'pickupTime', label: '领取时间',width:100},
        // { name: 'endTime', label: '截止时间',width:100},
        // { name: 'currentProgress', label: '截止时间',width:150},
        // { name: 'maintainOverview', label: '维护概述',width:150},
        { name: "operation", type: "operation", label: "操作", width: 200, renders: [
          {
            name: "查看维护信息",
            type: "primary",
            func: "showDetail"
            // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
          },
          {
            name: "展开",
            type: "custom",
            // type 为custom的时候自定义按钮
            class: "custom",
            func: "open"
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
      showLoadMore: false,
      loadMoreText: "上拉加载更多"
    };
  },
  onLoad() {
    this.dataSelf = pages_MaintainProcedureRecord_RecordData.RecordData.slice(0, 15);
    this.dataAll = pages_MaintainProcedureRecord_RecordData.RecordData.slice(0, 15);
  },
  methods: {
    tabsClick(item) {
      this.tabsIndex = item.index;
      console.log(this.tabsIndex);
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
    },
    open(ite, index) {
      common_vendor.index.showToast({
        icon: "none",
        duration: 500,
        title: "展开"
      });
      console.log(ite, index);
      this.MaintainTask.comment = ite.comment;
      this.MaintainTask.currentProgress = ite.currentProgress;
      this.MaintainTask.endTime = ite.endTime;
      this.MaintainTask.maintainOverview = ite.maintainOverview;
      this.MaintainTask.maintainType = ite.maintainType;
      this.MaintainTask.maintenancePersonnel = ite.maintenancePersonnel;
      this.MaintainTask.pickupTime = ite.pickupTime;
      this.MaintainTask.taskName = ite.taskName;
      this.MaintainTask.maintenancePersonnel = ite.maintenancePersonnel;
      this.showOpen = true;
    },
    confirmOpen() {
      this.showOpen = false;
    },
    handleClickAction(e) {
      this.showOpen = true;
    },
    pullUpLoadingAction(done) {
      if (this.dataSelf.length == pages_MaintainProcedureRecord_RecordData.RecordData.length) {
        return;
      }
      setTimeout(() => {
        this.dataSelf.push(pages_MaintainProcedureRecord_RecordData.RecordData[this.dataSelf.length]);
        if (this.dataSelf.length == pages_MaintainProcedureRecord_RecordData.RecordData.length) {
          this.$refs.tableSelf.pullUpCompleteLoading("ok");
        } else {
          this.$refs.tableSelf.pullUpCompleteLoading();
        }
      }, 1e3);
    },
    pullUpLoadingAction2(done) {
      if (this.dataAll.length == pages_MaintainProcedureRecord_RecordData.RecordData.length) {
        return;
      }
      setTimeout(() => {
        this.dataAll.push(pages_MaintainProcedureRecord_RecordData.RecordData[this.dataAll.length]);
        if (this.dataAll.length == pages_MaintainProcedureRecord_RecordData.RecordData.length) {
          this.$refs.tableAll.pullUpCompleteLoading("ok");
        } else {
          this.$refs.tableAll.pullUpCompleteLoading();
        }
      }, 1e3);
    }
  }
};
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_zb_table2 = common_vendor.resolveComponent("zb-table");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_u_tabs2 + _easycom_zb_table2 + _easycom_u_modal2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_zb_table = () => "../../uni_modules/zb-table/components/zb-table/zb-table.js";
const _easycom_u_modal = () => "../../uni_modules/uview-plus/components/u-modal/u-modal.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_zb_table + _easycom_u_modal + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
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
    g: common_vendor.o($options.open),
    h: $data.tabsIndex === 0,
    i: common_vendor.o($options.pullUpLoadingAction),
    j: common_vendor.p({
      fit: true,
      stripe: true,
      columns: $data.column1,
      data: $data.dataSelf,
      isShowLoadMore: true
    }),
    k: $data.tabsIndex === 0,
    l: common_vendor.sr("tableAll", "38046e5a-2"),
    m: common_vendor.o($options.showDetail),
    n: common_vendor.o($options.open),
    o: $data.tabsIndex === 1,
    p: common_vendor.o($options.pullUpLoadingAction2),
    q: common_vendor.p({
      fit: true,
      border: true,
      stripe: true,
      columns: $data.column2,
      data: $data.dataAll,
      isShowLoadMore: true
    }),
    r: $data.tabsIndex === 1,
    s: common_vendor.sr("tableAllDetail", "38046e5a-4,38046e5a-3"),
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
    D: common_vendor.sr("form", "38046e5a-6,38046e5a-5"),
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
    }),
    L: common_vendor.o(($event) => $data.MaintainTask.taskName = $event),
    M: common_vendor.p({
      disabled: true,
      modelValue: $data.MaintainTask.taskName
    }),
    N: common_vendor.p({
      label: "维护任务"
    }),
    O: common_vendor.o(($event) => $data.MaintainTask.maintenancePersonnel = $event),
    P: common_vendor.p({
      disabled: true,
      modelValue: $data.MaintainTask.maintenancePersonnel
    }),
    Q: common_vendor.p({
      label: "维护人员"
    }),
    R: common_vendor.o(($event) => $data.MaintainTask.maintainType = $event),
    S: common_vendor.p({
      disabled: true,
      modelValue: $data.MaintainTask.maintainType
    }),
    T: common_vendor.p({
      label: "维护类型"
    }),
    U: common_vendor.o(($event) => $data.MaintainTask.pickupTime = $event),
    V: common_vendor.p({
      disabled: true,
      modelValue: $data.MaintainTask.pickupTime
    }),
    W: common_vendor.p({
      label: "领取时间"
    }),
    X: common_vendor.o(($event) => $data.MaintainTask.endTime = $event),
    Y: common_vendor.p({
      disabled: true,
      modelValue: $data.MaintainTask.endTime
    }),
    Z: common_vendor.p({
      label: "截止时间"
    }),
    aa: common_vendor.o(($event) => $data.MaintainTask.currentProgress = $event),
    ab: common_vendor.p({
      disabled: true,
      modelValue: $data.MaintainTask.currentProgress
    }),
    ac: common_vendor.p({
      label: "当前进度"
    }),
    ad: common_vendor.o(($event) => $data.MaintainTask.maintainOverview = $event),
    ae: common_vendor.p({
      disabled: true,
      modelValue: $data.MaintainTask.maintainOverview
    }),
    af: common_vendor.p({
      label: "维护概述"
    }),
    ag: common_vendor.sr("form", "38046e5a-13,38046e5a-12"),
    ah: common_vendor.p({
      modelValue: $data.MaintainTask,
      ["label-width"]: "100px"
    }),
    ai: common_vendor.o($options.confirmOpen),
    aj: common_vendor.p({
      show: $data.showOpen,
      title: ""
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/Codes/WaterSupply/wechatApp/wechat/pages/MaintainProcedureRecord/MaintainProcedureRecord.vue"]]);
wx.createPage(MiniProgramPage);
