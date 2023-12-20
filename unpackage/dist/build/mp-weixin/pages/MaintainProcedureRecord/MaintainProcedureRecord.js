"use strict";const e=require("../../common/vendor.js"),t=require("./RecordData.js"),a={data:()=>({tabsList:[{name:"相关任务"},{name:"所有任务"}],tabsIndex:0,showAllDetail:!1,showTransfer:!1,showComplete:!1,column1:[{name:"taskInfo",label:"维护任务",width:100,fixed:!0},{name:"maintainType",label:"维护类型",width:80},{name:"pickupTime",label:"领取时间",width:100},{name:"endTime",label:"截止时间",width:100},{name:"currentProgress",label:"截止时间",width:150},{name:"maintainOverview",label:"维护概述",width:150},{name:"operation",type:"operation",label:"操作",width:220,renders:[{name:"转交",type:"primary",func:"trans"},{name:"维护",type:"primary",func:"maintain"},{name:"完成",type:"primary",func:"complete"}]}],column2:[{name:"taskInfo",label:"维护任务",width:80,fixed:!0},{name:"maintenancePersonnel",label:"维护人员",width:80,fixed:!0},{name:"maintainType",label:"维护类型",width:80},{name:"pickupTime",label:"领取时间",width:100},{name:"endTime",label:"截止时间",width:100},{name:"currentProgress",label:"截止时间",width:150},{name:"maintainOverview",label:"维护概述",width:150},{name:"operation",type:"operation",label:"操作",width:200,renders:[{name:"查看维护信息",type:"primary",func:"showDetail"}]}],maintainItemList:[{name:"维护项目1",content:"设备清洁",maintainData:"维护数据1",finishSituation:"完成"},{name:"维护项目2",content:"设备故障维护",maintainData:"维护数据2",finishSituation:"完成"},{name:"维护项目3",content:"维护内容3",maintainData:"维护数据3",finishSituation:"完成"},{name:"维护项目4",content:"维护内容4",maintainData:"维护数据4",finishSituation:"完成"}],maintainItemColumns:[{name:"name",label:"维护项目",width:100,fixed:!0},{name:"content",label:"维护项目内容",width:150,fixed:!0},{name:"finishSituation",label:"完成情况",width:100}],transferer:{name:"",reason:""},dataSelf:[],dataAll:[],pageSize:9,pageCurrent:1,total:0,pageSize2:9,pageCurrent2:1,total2:0}),onLoad(){this.getData(1),this.getData2(1)},methods:{tabsClick(e){this.tabsIndex=e.index,console.log(this.tabsIndex)},change(e){this.$refs.tableSelf.clearSelection(),this.getData(e.current)},search(){this.getData(1,this.searchVal)},getData(e,t=""){this.pageCurrent=e,this.request({pageSize:this.pageSize,pageCurrent:e,value:t,success:e=>{this.dataSelf=e.data,this.total=e.total}})},request(e){const{pageSize:a,pageCurrent:n,success:i,value:o}=e;let s=t.RecordData.length,l=t.RecordData.filter(((e,t)=>{const i=t-(n-1)*a;return i<a&&i>=0}));o&&(l=[],t.RecordData.forEach((e=>{-1!==e.name.indexOf(o)&&l.push(e)})),s=l.length),setTimeout((()=>{"function"==typeof i&&i({data:l,total:s})}),500)},change2(e){this.$refs.tableAll.clearSelection(),this.getData2(e.current)},search2(){this.getData2(1,this.searchVal)},getData2(e,t=""){this.pageCurrent2=e,this.request({pageSize:this.pageSize2,pageCurrent:e,value:t,success:e=>{this.dataAll=e.data,this.total2=e.total}})},showDetail(t,a){e.index.showToast({icon:"none",duration:500,title:"查看维护信息"}),console.log(t,a),this.showAllDetail=!0},trans(t,a){e.index.showToast({icon:"none",duration:500,title:"转交"}),console.log(t,a),this.showTransfer=!0},maintain(t,a){e.index.showToast({icon:"none",duration:1e3,title:"维护"}),console.log(t,a)},complete(t,a){e.index.showToast({icon:"none",duration:500,title:"完成"}),console.log(t,a),this.showComplete=!0},confirmAllDetail(){this.showAllDetail=!1},confirmTransfer(){this.showTransfer=!1},cancelTransfer(){this.showTransfer=!1},confirmComplete(){this.showComplete=!1},cancelComplete(){this.showComplete=!1}}};if(!Array){(e.resolveComponent("u-tabs")+e.resolveComponent("zb-table")+e.resolveComponent("uni-pagination")+e.resolveComponent("u-modal")+e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-forms"))()}Math||((()=>"../../uni_modules/uview-plus/components/u-tabs/u-tabs.js")+(()=>"../../uni_modules/zb-table/components/zb-table/zb-table.js")+(()=>"../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js")+(()=>"../../uni_modules/uview-plus/components/u-modal/u-modal.js")+(()=>"../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"))();const n=e._export_sfc(a,[["render",function(t,a,n,i,o,s){return{a:e.o(s.tabsClick),b:e.p({list:o.tabsList}),c:e.sr("tableSelf","38046e5a-1"),d:e.o(s.trans),e:e.o(s.maintain),f:e.o(s.complete),g:0===o.tabsIndex,h:e.p({fit:!0,border:!0,stripe:!0,columns:o.column1,data:o.dataSelf}),i:e.o(s.change),j:0===o.tabsIndex,k:e.p({"show-icon":!0,"page-size":o.pageSize,current:o.pageCurrent,total:o.total}),l:e.sr("tableAll","38046e5a-3"),m:e.o(s.showDetail),n:1===o.tabsIndex,o:e.p({fit:!0,border:!0,stripe:!0,columns:o.column2,data:o.dataAll}),p:e.o(s.change2),q:1===o.tabsIndex,r:e.p({"show-icon":!0,"page-size":o.pageSize2,current:o.pageCurrent2,total:o.total2}),s:e.sr("tableAllDetail","38046e5a-6,38046e5a-5"),t:e.p({fit:!0,border:!0,stripe:!0,columns:o.maintainItemColumns,data:o.maintainItemList}),v:e.o(s.confirmAllDetail),w:e.p({show:o.showAllDetail,title:"维护项目详情"}),x:e.o((e=>o.transferer.name=e)),y:e.p({placeholder:"请输入转交对象",modelValue:o.transferer.name}),z:e.p({label:"转交对象",required:!0}),A:e.o((e=>o.transferer.reason=e)),B:e.p({type:"password",placeholder:"请输入转交理由",modelValue:o.transferer.reason}),C:e.p({label:"转交理由"}),D:e.sr("form","38046e5a-8,38046e5a-7"),E:e.p({modelValue:t.tranferer,"label-width":"100px"}),F:e.o(s.confirmTransfer),G:e.o(s.cancelTransfer),H:e.p({show:o.showTransfer,title:"转交维护项目",showCancelButton:"true"}),I:e.o(s.confirmComplete),J:e.o(s.cancelComplete),K:e.p({show:o.showComplete,title:"完成维护项目",showCancelButton:"true"})}}]]);wx.createPage(n);