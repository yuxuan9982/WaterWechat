"use strict";const t=require("../../../../common/vendor.js");function e(t){let e="";for(let o in t){e+=`${o}:${t[o]};`}return e}const o={name:"uni-easyinput",emits:["click","iconClick","update:modelValue","input","focus","blur","confirm","clear","eyes","change","keyboardheightchange"],model:{prop:"modelValue",event:"update:modelValue"},options:{virtualHost:!0},inject:{form:{from:"uniForm",default:null},formItem:{from:"uniFormItem",default:null}},props:{name:String,value:[Number,String],modelValue:[Number,String],type:{type:String,default:"text"},clearable:{type:Boolean,default:!0},autoHeight:{type:Boolean,default:!1},placeholder:{type:String,default:" "},placeholderStyle:String,focus:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},clearSize:{type:[Number,String],default:24},inputBorder:{type:Boolean,default:!0},prefixIcon:{type:String,default:""},suffixIcon:{type:String,default:""},trim:{type:[Boolean,String],default:!1},cursorSpacing:{type:Number,default:0},passwordIcon:{type:Boolean,default:!0},primaryColor:{type:String,default:"#2979ff"},styles:{type:Object,default:()=>({color:"#333",backgroundColor:"#fff",disableColor:"#F7F6F6",borderColor:"#e5e5e5"})},errorMessage:{type:[String,Boolean],default:""}},data:()=>({focused:!1,val:"",showMsg:"",border:!1,isFirstBorder:!1,showClearIcon:!1,showPassword:!1,focusShow:!1,localMsg:"",isEnter:!1}),computed:{isVal(){const t=this.val;return!(!t&&0!==t)},msg(){return this.localMsg||this.errorMessage},inputMaxlength(){return Number(this.maxlength)},boxStyle(){return`color:${this.inputBorder&&this.msg?"#e43d33":this.styles.color};`},inputContentClass(){return function(t){let e="";for(let o in t)t[o]&&(e+=`${o} `);return e}({"is-input-border":this.inputBorder,"is-input-error-border":this.inputBorder&&this.msg,"is-textarea":"textarea"===this.type,"is-disabled":this.disabled,"is-focused":this.focusShow})},inputContentStyle(){const t=this.focusShow?this.primaryColor:this.styles.borderColor;return e({"border-color":(this.inputBorder&&this.msg?"#dd524d":t)||"#e5e5e5","background-color":this.disabled?this.styles.disableColor:this.styles.backgroundColor})},inputStyle(){return e({"padding-right":"password"===this.type||this.clearable||this.prefixIcon?"":"10px","padding-left":this.prefixIcon?"":"10px"})}},watch:{value(t){this.val=t},modelValue(t){this.val=t},focus(t){this.$nextTick((()=>{this.focused=this.focus,this.focusShow=this.focus}))}},created(){this.init(),this.form&&this.formItem&&this.$watch("formItem.errMsg",(t=>{this.localMsg=t}))},mounted(){this.$nextTick((()=>{this.focused=this.focus,this.focusShow=this.focus}))},methods:{init(){this.value||0===this.value?this.val=this.value:this.modelValue||0===this.modelValue||""===this.modelValue?this.val=this.modelValue:this.val=null},onClickIcon(t){this.$emit("iconClick",t)},onEyes(){this.showPassword=!this.showPassword,this.$emit("eyes",this.showPassword)},onInput(t){let e=t.detail.value;this.trim&&("boolean"==typeof this.trim&&this.trim&&(e=this.trimStr(e)),"string"==typeof this.trim&&(e=this.trimStr(e,this.trim))),this.errMsg&&(this.errMsg=""),this.val=e,this.$emit("input",e),this.$emit("update:modelValue",e)},onFocus(){this.$nextTick((()=>{this.focused=!0})),this.$emit("focus",null)},_Focus(t){this.focusShow=!0,this.$emit("focus",t)},onBlur(){this.focused=!1,this.$emit("focus",null)},_Blur(t){if(t.detail.value,this.focusShow=!1,this.$emit("blur",t),!1===this.isEnter&&this.$emit("change",this.val),this.form&&this.formItem){const{validateTrigger:t}=this.form;"blur"===t&&this.formItem.onFieldChange()}},onConfirm(t){this.$emit("confirm",this.val),this.isEnter=!0,this.$emit("change",this.val),this.$nextTick((()=>{this.isEnter=!1}))},onClear(t){this.val="",this.$emit("input",""),this.$emit("update:modelValue",""),this.$emit("clear")},onkeyboardheightchange(t){this.$emit("keyboardheightchange",t)},trimStr:(t,e="both")=>"both"===e?t.trim():"left"===e?t.trimLeft():"right"===e?t.trimRight():"start"===e?t.trimStart():"end"===e?t.trimEnd():"all"===e?t.replace(/\s+/g,""):t}};if(!Array){t.resolveComponent("uni-icons")()}Math;const i=t._export_sfc(o,[["render",function(e,o,i,s,r,l){return t.e({a:i.prefixIcon},i.prefixIcon?{b:t.o((t=>l.onClickIcon("prefix"))),c:t.p({type:i.prefixIcon,color:"#c0c4cc",size:"22"})}:{},{d:"textarea"===i.type},"textarea"===i.type?{e:i.inputBorder?1:"",f:i.name,g:r.val,h:i.placeholder,i:i.placeholderStyle,j:i.disabled,k:l.inputMaxlength,l:r.focused,m:i.autoHeight,n:i.cursorSpacing,o:t.o(((...t)=>l.onInput&&l.onInput(...t))),p:t.o(((...t)=>l._Blur&&l._Blur(...t))),q:t.o(((...t)=>l._Focus&&l._Focus(...t))),r:t.o(((...t)=>l.onConfirm&&l.onConfirm(...t))),s:t.o(((...t)=>l.onkeyboardheightchange&&l.onkeyboardheightchange(...t)))}:{t:"password"===i.type?"text":i.type,v:t.s(l.inputStyle),w:i.name,x:r.val,y:!r.showPassword&&"password"===i.type,z:i.placeholder,A:i.placeholderStyle,B:i.disabled,C:l.inputMaxlength,D:r.focused,E:i.confirmType,F:i.cursorSpacing,G:t.o(((...t)=>l._Focus&&l._Focus(...t))),H:t.o(((...t)=>l._Blur&&l._Blur(...t))),I:t.o(((...t)=>l.onInput&&l.onInput(...t))),J:t.o(((...t)=>l.onConfirm&&l.onConfirm(...t))),K:t.o(((...t)=>l.onkeyboardheightchange&&l.onkeyboardheightchange(...t)))},{L:"password"===i.type&&i.passwordIcon},"password"===i.type&&i.passwordIcon?t.e({M:l.isVal},l.isVal?{N:"textarea"===i.type?1:"",O:t.o(l.onEyes),P:t.p({type:r.showPassword?"eye-slash-filled":"eye-filled",size:22,color:r.focusShow?i.primaryColor:"#c0c4cc"})}:{}):i.suffixIcon?t.e({R:i.suffixIcon},i.suffixIcon?{S:t.o((t=>l.onClickIcon("suffix"))),T:t.p({type:i.suffixIcon,color:"#c0c4cc",size:"22"})}:{}):t.e({U:i.clearable&&l.isVal&&!i.disabled&&"textarea"!==i.type},i.clearable&&l.isVal&&!i.disabled&&"textarea"!==i.type?{V:"textarea"===i.type?1:"",W:t.o(l.onClear),X:t.p({type:"clear",size:i.clearSize,color:l.msg?"#dd524d":r.focusShow?i.primaryColor:"#c0c4cc"})}:{}),{Q:i.suffixIcon,Y:t.n(l.inputContentClass),Z:t.s(l.inputContentStyle),aa:l.msg?1:"",ab:t.s(l.boxStyle)})}]]);wx.createComponent(i);
