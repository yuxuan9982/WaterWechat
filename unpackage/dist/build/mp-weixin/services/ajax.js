"use strict";const e=require("../common/vendor.js");let o="http://localhost:9999/wmis";const t={post:(t,n)=>(console.log("post",o,t),new Promise(((a,s)=>{e.index.request({url:`${o}${t}`,method:"POST",data:n,header:{token:"",userId:-1,departmentId:-1},success:o=>{console.log("res:",o.data),200===o.statusCode?void 0!==o.data.exception&&o.data.exception?(e.index.showToast({title:o.data.msg,icon:"none",duration:2e3}),s(o.data)):a(o.data):(e.index.showToast({title:"操作失败，服务端出现异常错误！",icon:"none",duration:2e3}),s(o.data))},fail:o=>{e.index.showToast({title:"网络请求失败",icon:"none",duration:2e3}),s(o)}})}))),postjson:(t,n)=>(console.log("postJson",o,t),new Promise(((a,s)=>{e.index.request({url:`${o}${t}`,method:"POST",data:n,header:{"Content-Type":"application/json;charset=utf-8",token:"",userId:-1,departmentId:-1},success:o=>{console.log("res:",o.data),200===o.statusCode?void 0!==o.data.exception&&o.data.exception?(e.index.showToast({title:o.data.msg,icon:"none",duration:2e3}),s(o.data)):a(o.data):(e.index.showToast({title:"操作失败，服务端出现异常错误！",icon:"none",duration:2e3}),s(o.data))},fail:o=>{e.index.showToast({title:"网络请求失败",icon:"none",duration:2e3}),s(o)}})}))),postfile:(t,n)=>(console.log("postFile",o,t),new Promise(((a,s)=>{e.index.uploadFile({url:`${o}${t}`,filePath:n.filePath,name:"file",formData:n.formData,header:{"Content-Type":"multipart/form-data"},success:o=>{console.log("res:",o.data);const t=JSON.parse(o.data);200===o.statusCode?void 0!==t.exception&&t.exception?(e.index.showToast({title:t.msg,icon:"none",duration:2e3}),s(t)):a(t):(e.index.showToast({title:"操作失败，服务端出现异常错误！",icon:"none",duration:2e3}),s(t))},fail:o=>{e.index.showToast({title:"网络请求失败",icon:"none",duration:2e3}),s(o)}})}))),download(t,n){e.index.downloadFile({url:`${o}${t}`,success:o=>{if(200===o.statusCode){const t=o.tempFilePath;e.index.saveFile({tempFilePath:t,success:o=>{e.index.showToast({title:"下载成功",icon:"success",duration:2e3})},fail:o=>{e.index.showToast({title:"保存文件失败",icon:"none",duration:2e3})}})}else e.index.showToast({title:"下载失败",icon:"none",duration:2e3})},fail:o=>{e.index.showToast({title:"网络请求失败",icon:"none",duration:2e3})}})}};exports.ajax=t;
