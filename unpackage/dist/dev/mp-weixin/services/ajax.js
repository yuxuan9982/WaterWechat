"use strict";
const common_vendor = require("../common/vendor.js");
let baseURL = "http://localhost:9999/wmis";
let token = "";
let userId = -1;
let departmentId = -1;
const ajax = {
  post(url, params) {
    console.log("post", baseURL, url);
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: `${baseURL}${url}`,
        method: "POST",
        data: params,
        header: {
          "token": token,
          "userId": userId,
          "departmentId": departmentId
        },
        success: (res) => {
          console.log("res:", res.data);
          if (res.statusCode === 200) {
            if (res.data.exception !== void 0 && res.data.exception) {
              common_vendor.index.showToast({
                title: res.data.msg,
                icon: "none",
                duration: 2e3
              });
              reject(res.data);
            } else {
              resolve(res.data);
            }
          } else {
            common_vendor.index.showToast({
              title: "操作失败，服务端出现异常错误！",
              icon: "none",
              duration: 2e3
            });
            reject(res.data);
          }
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: "网络请求失败",
            icon: "none",
            duration: 2e3
          });
          reject(err);
        }
      });
    });
  },
  postjson(url, params) {
    console.log("postJson", baseURL, url);
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: `${baseURL}${url}`,
        method: "POST",
        data: params,
        header: {
          "Content-Type": "application/json;charset=utf-8",
          "token": token,
          "userId": userId,
          "departmentId": departmentId
          // 在 Uni-app 中，可以在这里设置其他请求头
        },
        success: (res) => {
          console.log("res:", res.data);
          if (res.statusCode === 200) {
            if (res.data.exception !== void 0 && res.data.exception) {
              common_vendor.index.showToast({
                title: res.data.msg,
                icon: "none",
                duration: 2e3
              });
              reject(res.data);
            } else {
              resolve(res.data);
            }
          } else {
            common_vendor.index.showToast({
              title: "操作失败，服务端出现异常错误！",
              icon: "none",
              duration: 2e3
            });
            reject(res.data);
          }
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: "网络请求失败",
            icon: "none",
            duration: 2e3
          });
          reject(err);
        }
      });
    });
  },
  postfile(url, params) {
    console.log("postFile", baseURL, url);
    return new Promise((resolve, reject) => {
      common_vendor.index.uploadFile({
        url: `${baseURL}${url}`,
        filePath: params.filePath,
        // 本地文件路径
        name: "file",
        // 服务端接收的文件字段名
        formData: params.formData,
        // 其他参数
        header: {
          "Content-Type": "multipart/form-data"
          // 在 Uni-app 中，可以在这里设置其他请求头
        },
        success: (res) => {
          console.log("res:", res.data);
          const data = JSON.parse(res.data);
          if (res.statusCode === 200) {
            if (data.exception !== void 0 && data.exception) {
              common_vendor.index.showToast({
                title: data.msg,
                icon: "none",
                duration: 2e3
              });
              reject(data);
            } else {
              resolve(data);
            }
          } else {
            common_vendor.index.showToast({
              title: "操作失败，服务端出现异常错误！",
              icon: "none",
              duration: 2e3
            });
            reject(data);
          }
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: "网络请求失败",
            icon: "none",
            duration: 2e3
          });
          reject(err);
        }
      });
    });
  },
  download(url, fileName) {
    common_vendor.index.downloadFile({
      url: `${baseURL}${url}`,
      success: (res) => {
        if (res.statusCode === 200) {
          const tempFilePath = res.tempFilePath;
          common_vendor.index.saveFile({
            tempFilePath,
            success: (saveRes) => {
              common_vendor.index.showToast({
                title: "下载成功",
                icon: "success",
                duration: 2e3
              });
            },
            fail: (saveErr) => {
              common_vendor.index.showToast({
                title: "保存文件失败",
                icon: "none",
                duration: 2e3
              });
            }
          });
        } else {
          common_vendor.index.showToast({
            title: "下载失败",
            icon: "none",
            duration: 2e3
          });
        }
      },
      fail: (err) => {
        common_vendor.index.showToast({
          title: "网络请求失败",
          icon: "none",
          duration: 2e3
        });
      }
    });
  }
};
exports.ajax = ajax;
