"use strict";const t=require("../../../../common/vendor.js"),e=require("./test.js"),n=require("./digit.js");function r(t){if([null,void 0,NaN,!1].includes(t))return t;if("object"!=typeof t&&"function"!=typeof t)return t;const n=e.test.array(t)?[]:{};for(const e in t)t.hasOwnProperty(e)&&(n[e]="object"==typeof t[e]?r(t[e]):t[e]);return n}function o(t=null,e="yyyy-mm-dd"){let n;n=t?/^\d{10}$/.test(t.toString().trim())?new Date(1e3*t):"string"==typeof t&&/^\d+$/.test(t.trim())?new Date(Number(t)):new Date("string"==typeof t?t.replace(/-/g,"/"):t):new Date;const r={y:n.getFullYear().toString(),m:(n.getMonth()+1).toString().padStart(2,"0"),d:n.getDate().toString().padStart(2,"0"),h:n.getHours().toString().padStart(2,"0"),M:n.getMinutes().toString().padStart(2,"0"),s:n.getSeconds().toString().padStart(2,"0")};for(const o in r){const[t]=new RegExp(`${o}+`).exec(e)||[];if(t){const n="y"===o&&2===t.length?2:0;e=e.replace(t,r[o].slice(n))}}return e}function i(t,e="both"){return t=String(t),"both"==e?t.replace(/^\s+|\s+$/g,""):"left"==e?t.replace(/^\s*/,""):"right"==e?t.replace(/(\s*$)/g,""):"all"==e?t.replace(/\s+/g,""):t}String.prototype.padStart||(String.prototype.padStart=function(t,e=" "){if("[object String]"!==Object.prototype.toString.call(e))throw new TypeError("fillString must be String");const n=this;if(n.length>=t)return String(n);const r=t-n.length;let o=Math.ceil(r/e.length);for(;o>>=1;)e+=e,1===o&&(e+=e);return e.slice(0,r)+n});const s={range:function(t=0,e=0,n=0){return Math.max(t,Math.min(e,Number(n)))},getPx:function(n,r=!1){return e.test.number(n)?r?`${n}px`:Number(n):/(rpx|upx)$/.test(n)?r?`${t.index.upx2px(parseInt(n))}px`:Number(t.index.upx2px(parseInt(n))):r?`${parseInt(n)}px`:parseInt(n)},sleep:function(t=30){return new Promise((e=>{setTimeout((()=>{e()}),t)}))},os:function(){return t.index.getSystemInfoSync().platform.toLowerCase()},sys:function(){return t.index.getSystemInfoSync()},random:function(t,e){if(t>=0&&e>0&&e>=t){const n=e-t+1;return Math.floor(Math.random()*n+t)}return 0},guid:function(t=32,e=!0,n=null){const r="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),o=[];if(n=n||r.length,t)for(let i=0;i<t;i++)o[i]=r[0|Math.random()*n];else{let t;o[8]=o[13]=o[18]=o[23]="-",o[14]="4";for(let e=0;e<36;e++)o[e]||(t=0|16*Math.random(),o[e]=r[19==e?3&t|8:t])}return e?(o.shift(),`u${o.join("")}`):o.join("")},$parent:function(t){let e=this.$parent;for(;e;){if(!e.$options||e.$options.name===t)return e;e=e.$parent}return!1},addStyle:function(t,n="object"){if(e.test.empty(t)||"object"==typeof t&&"object"===n||"string"===n&&"string"==typeof t)return t;if("object"===n){const e=(t=i(t)).split(";"),n={};for(let t=0;t<e.length;t++)if(e[t]){const r=e[t].split(":");n[i(r[0])]=i(r[1])}return n}let r="";for(const e in t){r+=`${e.replace(/([A-Z])/g,"-$1").toLowerCase()}:${t[e]};`}return i(r)},addUnit:function(n="auto",r=""){return r||(r=t.index.$u.config.unit||"px"),n=String(n),e.test.number(n)?`${n}${r}`:n},deepClone:r,deepMerge:function t(e={},n={}){if("object"!=typeof(e=r(e))||"object"!=typeof n)return!1;for(const r in n)n.hasOwnProperty(r)&&(r in e?null==n[r]||"object"!=typeof e[r]||"object"!=typeof n[r]?e[r]=n[r]:e[r].concat&&n[r].concat?e[r]=e[r].concat(n[r]):e[r]=t(e[r],n[r]):e[r]=n[r]);return e},error:function(t){},randomArray:function(t=[]){return t.sort((()=>Math.random()-.5))},timeFormat:o,timeFrom:function(t=null,e="yyyy-mm-dd"){null==t&&(t=Number(new Date)),10==(t=parseInt(t)).toString().length&&(t*=1e3);let n=(new Date).getTime()-t;n=parseInt(n/1e3);let r="";switch(!0){case n<300:r="刚刚";break;case n>=300&&n<3600:r=`${parseInt(n/60)}分钟前`;break;case n>=3600&&n<86400:r=`${parseInt(n/3600)}小时前`;break;case n>=86400&&n<2592e3:r=`${parseInt(n/86400)}天前`;break;default:r=!1===e?n>=2592e3&&n<31536e3?`${parseInt(n/2592e3)}个月前`:`${parseInt(n/31536e3)}年前`:o(t,e)}return r},trim:i,queryParams:function(t={},e=!0,n="brackets"){const r=e?"?":"",o=[];-1==["indices","brackets","repeat","comma"].indexOf(n)&&(n="brackets");for(const i in t){const e=t[i];if(!(["",void 0,null].indexOf(e)>=0))if(e.constructor===Array)switch(n){case"indices":for(let n=0;n<e.length;n++)o.push(`${i}[${n}]=${e[n]}`);break;case"brackets":default:e.forEach((t=>{o.push(`${i}[]=${t}`)}));break;case"repeat":e.forEach((t=>{o.push(`${i}=${t}`)}));break;case"comma":let t="";e.forEach((e=>{t+=(t?",":"")+e})),o.push(`${i}=${t}`)}else o.push(`${i}=${e}`)}return o.length?r+o.join("&"):""},toast:function(e,n=2e3){t.index.showToast({title:String(e),icon:"none",duration:n})},type2icon:function(t="success",e=!1){-1==["primary","info","error","warning","success"].indexOf(t)&&(t="success");let n="";switch(t){case"primary":case"info":n="info-circle";break;case"error":n="close-circle";break;case"warning":n="error-circle";break;default:n="checkmark-circle"}return e&&(n+="-fill"),n},priceFormat:function(t,e=0,r=".",o=","){t=`${t}`.replace(/[^0-9+-Ee.]/g,"");const i=isFinite(+t)?+t:0,s=isFinite(+e)?Math.abs(e):0,c=void 0===o?",":o,a=void 0===r?".":r;let u="";u=(s?n.round(i,s)+"":`${Math.round(i)}`).split(".");const f=/(-?\d+)(\d{3})/;for(;f.test(u[0]);)u[0]=u[0].replace(f,`$1${c}$2`);return(u[1]||"").length<s&&(u[1]=u[1]||"",u[1]+=new Array(s-u[1].length+1).join("0")),u.join(a)},getDuration:function(t,e=!0){const n=parseInt(t);return e?/s$/.test(t)?t:t>30?`${t}ms`:`${t}s`:/ms$/.test(t)?n:/s$/.test(t)?n>30?n:1e3*n:n},padZero:function(t){return`00${t}`.slice(-2)},formValidate:function(e,n){const r=t.index.$u.$parent.call(e,"u-form-item"),o=t.index.$u.$parent.call(e,"u-form");r&&o&&o.validateField(r.prop,(()=>{}),n)},getProperty:function(t,e){if(t){if("string"!=typeof e||""===e)return"";if(-1!==e.indexOf(".")){const n=e.split(".");let r=t[n[0]]||{};for(let t=1;t<n.length;t++)r&&(r=r[n[t]]);return r}return t[e]}},setProperty:function(t,e,n){if(!t)return;const r=function(t,e,n){if(1!==e.length)for(;e.length>1;){const o=e[0];t[o]&&"object"==typeof t[o]||(t[o]={}),e.shift(),r(t[o],e,n)}else t[e[0]]=n};if("string"!=typeof e||""===e);else if(-1!==e.indexOf(".")){const o=e.split(".");r(t,o,n)}else t[e]=n},page:function(){const t=getCurrentPages();return`/${t[t.length-1].route||""}`},pages:function(){return getCurrentPages()},setConfig:function({props:e={},config:n={},color:r={},zIndex:o={}}){const{deepMerge:i}=t.index.$u;t.index.$u.config=i(t.index.$u.config,n),t.index.$u.props=i(t.index.$u.props,e),t.index.$u.color=i(t.index.$u.color,r),t.index.$u.zIndex=i(t.index.$u.zIndex,o)}};exports.index=s;
