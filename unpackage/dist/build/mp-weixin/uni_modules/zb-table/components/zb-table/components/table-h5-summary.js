"use strict";const e=require("../js/summary.js"),o=require("../../../../../common/vendor.js"),r={name:"table-footer",mixins:[e.summary]};const t=o._export_sfc(r,[["render",function(e,r,t,n,s,a){return{a:o.f(e.transColumns,((r,t,n)=>({a:o.t(e.sums[t]),b:`${r.width?r.width:"100"}px`,c:t===e.transColumns.length-1?1:"none",d:`${r.width?r.width:"100"}px`,e:r.align||"left",f:t}))),b:""+(e.border?"1px solid #e8e8e8":""),c:""+(e.border?"1px solid #e8e8e8":""),d:o.o(((...o)=>e.handleFooterTableScrollLeft&&e.handleFooterTableScrollLeft(...o))),e:e.headerFooterTableLeft,f:`${e.scrollbarSize}px`}}],["__scopeId","data-v-0c7d6952"]]);wx.createComponent(t);