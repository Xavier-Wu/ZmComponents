!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("element-ui/lib/collapse-item/style.css"),require("element-ui/lib/collapse-item"),require("element-ui/lib/collapse/style.css"),require("element-ui/lib/collapse"),require("sortablejs")):"function"==typeof define&&define.amd?define("ZMaxCompanyComponents",["element-ui/lib/collapse-item/style.css","element-ui/lib/collapse-item","element-ui/lib/collapse/style.css","element-ui/lib/collapse","sortablejs"],t):"object"==typeof exports?exports.ZMaxCompanyComponents=t(require("element-ui/lib/collapse-item/style.css"),require("element-ui/lib/collapse-item"),require("element-ui/lib/collapse/style.css"),require("element-ui/lib/collapse"),require("sortablejs")):e.ZMaxCompanyComponents=t(e["element-ui/lib/collapse-item/style.css"],e["element-ui/lib/collapse-item"],e["element-ui/lib/collapse/style.css"],e["element-ui/lib/collapse"],e.sortablejs)}("undefined"!=typeof self?self:this,function(e,t,n,r,i){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=254)}({0:function(e,t){e.exports=function(e,t,n,r,i,a){var s,l=e=e||{},o=typeof e.default;"object"!==o&&"function"!==o||(s=e,l=e.default);var u="function"==typeof l?l.options:l;t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),i&&(u._scopeId=i);var c;if(a?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},u._ssrRegister=c):r&&(c=r),c){var d=u.functional,p=d?u.render:u.beforeCreate;d?(u._injectStyles=c,u.render=function(e,t){return c.call(t),p(e,t)}):u.beforeCreate=p?[].concat(p,c):[c]}return{esModule:s,exports:l,options:u}}},1:function(e,t){function n(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var a=r(i);return[n].concat(i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"})).concat([a]).join("\n")}return[n].join("\n")}function r(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var a=this[i][0];"number"==typeof a&&(r[a]=!0)}for(i=0;i<e.length;i++){var s=e[i];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},10:function(e,t,n){var r=n(11);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(2)("325c6294",r,!0,{})},11:function(e,t,n){t=e.exports=n(1)(!1),t.push([e.i,".setPriceTable .el-input__inner{border:none!important}",""])},12:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"setPriceTable"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.getTableData(),border:""}},[n("el-table-column",{attrs:{label:"制式\\影厅"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.yAxis))]}}])}),e._v(" "),e._l(e.getXAxisArray(),function(t){return n("el-table-column",{key:t,attrs:{label:t},scopedSlots:e._u([{key:"default",fn:function(r){return[e._t("input",[n("el-input-number",{staticClass:"wp100",attrs:{disabled:e.disabled,min:null,controls:!1,placeholder:e.placeholder},model:{value:e.getPriceValue(r.row,t)[e.xAxisItemValueKey],callback:function(n){e.$set(e.getPriceValue(r.row,t),e.xAxisItemValueKey,n)},expression:"getPriceValue(scope.row,item)[xAxisItemValueKey]"}})],{row:e.getPriceValue(r.row,t)})]}}],null,!0)})})],2)],1)},i=[],a={render:r,staticRenderFns:i};t.a=a},13:function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=n(8);t.a={name:"SetPriceTableItems",components:{SetPriceTable:a.default},props:{keys:{type:Array,default:function(){return[{label:"结算价格",value:"settlePriceRule",placeholder:"请填写结算金额"},{label:"影院服务费",value:"servicePriceRule",placeholder:"请填写影院服务费"}]}},data:{type:Object,required:!0},axisValuelKey:{type:String,default:"value"},allXAxis:{type:Array,required:!0},allYAxis:{type:Array,required:!0},disabled:{type:Boolean,default:function(){return!1}},xAxis:{type:String,required:!0},yAxis:{type:String,required:!0},yAxisKey:{type:String,default:"copyType"},xAxisKey:{type:String,default:"price"},xAxisItemTypeKey:{type:String,default:"hallType"},xAxisItemValueKey:{type:String,default:"money"}},data:function(){return{loading:!0}},mounted:function(){this.init()},methods:{init:function(){this.initeRule()},createRuleItem:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=this.allYAxis,r=this.allXAxis;return n.map(function(n){var a;return a={},i(a,e.yAxisKey,n[e.axisValuelKey]),i(a,e.xAxisKey,r.map(function(r){var a;return a={},i(a,e.xAxisItemTypeKey,r[e.axisValuelKey]),i(a,e.xAxisItemValueKey,e.getRulePrice(t,n[e.axisValuelKey],r[e.axisValuelKey])),a})),a})},getRulePrice:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=this,n=arguments[1],i=arguments[2];if(!e.length)return"";var a=[].concat(r(e)),s=a.find(function(e){return e[t.yAxisKey]===n});if(s){return(s[this.xAxisKey].find(function(e){return e[t.xAxisItemTypeKey]===i})||{})[this.xAxisItemValueKey]||""}return""},initeRule:function(){var e=this;this.keys.forEach(function(t){var n=t.value,i=e.createRuleItem(e.data[n]);e.data[n]=[].concat(r(i))}),this.$nextTick(function(){e.loading=!1})}}}},14:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(15);r.a.install=function(e){return e.component(r.a.name,r.a)},t.default=r.a},15:function(e,t,n){"use strict";function r(e){n(16)}var i=n(5),a=n(27),s=n(0),l=r,o=s(i.a,a.a,!1,l,null,null);t.a=o.exports},16:function(e,t,n){var r=n(17);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(2)("042726ee",r,!0,{})},17:function(e,t,n){t=e.exports=n(1)(!1),t.push([e.i,".SetPriceTableItemsHandle .m-collapse-title{font-size:18px;color:#555;margin-bottom:10px;width:100%;display:flex!important;justify-content:center}.SetPriceTableItemsHandle .el-collapse{border:none!important;margin-bottom:10px!important}.SetPriceTableItemsHandle .el-collapse-item__wrap{border-bottom:none}.SetPriceTableItemsHandle .el-collapse-item:last-child{border:1px solid #eee;padding:10px 10px 0;box-sizing:border-box}.SetPriceTableItemsHandle .el-collapse-item__header{border:none!important}.SetPriceTableItemsHandle .el-collapse-item__arrow{margin-top:-9px!important}",""])},18:function(t,n){t.exports=e},19:function(e,n){e.exports=t},2:function(e,t,n){function r(e){for(var t=0;t<e.length;t++){var n=e[t],r=c[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(a(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var s=[],i=0;i<n.parts.length;i++)s.push(a(n.parts[i]));c[n.id]={id:n.id,refs:1,parts:s}}}}function i(){var e=document.createElement("style");return e.type="text/css",d.appendChild(e),e}function a(e){var t,n,r=document.querySelector("style["+h+'~="'+e.id+'"]');if(r){if(m)return y;r.parentNode.removeChild(r)}if(v){var a=f++;r=p||(p=i()),t=s.bind(null,r,a,!1),n=s.bind(null,r,a,!0)}else r=i(),t=l.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}function s(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=b(t,i);else{var a=document.createTextNode(i),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(a,s[t]):e.appendChild(a)}}function l(e,t){var n=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),x.ssrId&&e.setAttribute(h,t.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u=n(3),c={},d=o&&(document.head||document.getElementsByTagName("head")[0]),p=null,f=0,m=!1,y=function(){},x=null,h="data-vue-ssr-id",v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n,i){m=n,x=i||{};var a=u(e,t);return r(a),function(t){for(var n=[],i=0;i<a.length;i++){var s=a[i],l=c[s.id];l.refs--,n.push(l)}t?(a=u(e,t),r(a)):a=[];for(var i=0;i<n.length;i++){var l=n[i];if(0===l.refs){for(var o=0;o<l.parts.length;o++)l.parts[o]();delete c[l.id]}}}};var b=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},20:function(e,t){e.exports=n},21:function(e,t){e.exports=r},22:function(e,t,n){"use strict";function r(e){n(23)}var i=n(6),a=n(25),s=n(0),l=r,o=s(i.a,a.a,!1,l,"data-v-5439954c",null);t.a=o.exports},23:function(e,t,n){var r=n(24);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(2)("f0584ba6",r,!0,{})},24:function(e,t,n){t=e.exports=n(1)(!1),t.push([e.i,"",""])},25:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",[e._t("default")],2)},i=[],a={render:r,staticRenderFns:i};t.a=a},254:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(255);r.a.install=function(e){return e.component(r.a.name,r.a)},t.default=r.a},255:function(e,t,n){"use strict";var r=n(75),i=n(256),a=n(0),s=a(r.a,i.a,!1,null,null,null);t.a=s.exports},256:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("zm-collapse-form",{attrs:{more:e.more,title:e.title,rules:e.rules,"auto-add":!0},on:{"click-add":e.handleAdd},scopedSlots:e._u([{key:"default",fn:function(t){return n("div",{},[e._t("default",null,{row:t.row}),e._v(" "),n("set-price-table-items",{attrs:{keys:e.keys,data:t.row,"axis-valuel-key":e.axisValuelKey,"all-y-axis":e.allYAxis,"all-x-axis":e.allXAxis,"x-axis":e.xAxis,"y-axis":e.yAxis,"y-axis-key":e.yAxisKey,"x-axis-key":e.xAxisKey,"x-axis-item-type-key":e.xAxisItemTypeKey,"x-axis-item-value-key":e.xAxisItemValueKey,placeholder:e.placeholder,disabled:e.disabled}})],2)}}],null,!0)})},i=[],a={render:r,staticRenderFns:i};t.a=a},26:function(e,t){e.exports=i},27:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"SetPriceTableItemsHandle"},[n("div",{staticClass:"tr mr"},[e.isControls?n("el-button",{staticClass:"mb20",attrs:{disabled:e.addDisabled,type:"primary"},on:{click:e.handleAdd}},[e._v("添加")]):e._e()],1),e._v(" "),e._l(e.rules,function(t,r){return n(e.outsideBox,{key:r,tag:"component",model:{value:e.collapseActive,callback:function(t){e.collapseActive=t},expression:"collapseActive"}},[n(e.insideBox,{tag:"component",attrs:{name:r}},[n("div",{staticClass:"flex1",attrs:{slot:"title"},slot:"title"},[n("div",{staticClass:"m-collapse-title "},[n("div",{staticClass:"flex1"},[n("span",{directives:[{name:"show",rawName:"v-show",value:t.isEdit,expression:"item.isEdit"}]},[n("el-input",{staticClass:"w150",attrs:{placeholder:"请输入规则名称"},nativeOn:{click:function(t){return t.stopPropagation(),e.preventClick(t)}},model:{value:t.ruleItemName,callback:function(n){e.$set(t,"ruleItemName",n)},expression:"item.ruleItemName"}}),e._v(" "),n("span",{staticClass:"fs14 primary pointer",on:{click:function(n){return n.stopPropagation(),e.handleEditAction(t,r)}}},[e._v("取消")]),e._v(" "),n("span",{staticClass:"fs14 primary pointer",on:{click:function(n){return n.stopPropagation(),e.handleEditAction(t,r)}}},[e._v("确定")])],1),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!t.isEdit,expression:"!item.isEdit"}]},[e._v("\n              "+e._s(t.ruleItemName=t.ruleItemName?t.ruleItemName:e.title+(r+1))+"\n            ")])]),e._v(" "),e.isControls?n("div",{staticClass:"mr20"},[n("i",{staticClass:"el-icon-rank primary fs22 pointer drag-handle mr10"}),e._v(" "),e.canEditName?n("i",{staticClass:"el-icon-edit primary fs20 pointer mr10",on:{click:function(n){return n.stopPropagation(),e.handleEdit(t,r)}}}):e._e(),e._v(" "),n("i",{staticClass:"el-icon-delete fs20 mr10",class:e.rules.length<=e.min?"info notAllow":"primary pointer",on:{click:function(t){return t.stopPropagation(),e.handelDel(r,e.rules.length<=e.min)}}})]):e._e()])]),e._v(" "),e.sortLoading?e._e():e._t("default",null,{row:t,idx:r})],2)],1)})],2)},i=[],a={render:r,staticRenderFns:i};t.a=a},3:function(e,t){e.exports=function(e,t){for(var n=[],r={},i=0;i<t.length;i++){var a=t[i],s=a[0],l=a[1],o=a[2],u=a[3],c={id:e+":"+i,css:l,media:o,sourceMap:u};r[s]?r[s].parts.push(c):n.push(r[s]={id:s,parts:[c]})}return n}},34:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(35);r.a.install=function(e){return e.component(r.a.name,r.a)},t.default=r.a},35:function(e,t,n){"use strict";function r(e){n(36)}var i=n(13),a=n(38),s=n(0),l=r,o=s(i.a,a.a,!1,l,"data-v-51d575de",null);t.a=o.exports},36:function(e,t,n){var r=n(37);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(2)("597f4abf",r,!0,{})},37:function(e,t,n){t=e.exports=n(1)(!1),t.push([e.i,"",""])},38:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",e._l(e.keys,function(t,r){return e.loading?e._e():n("div",{key:r},[n("el-form-item",{attrs:{label:t.label}},[n("set-price-table",{attrs:{placeholder:t.placeholder,disabled:e.disabled,data:e.data[t.value],"y-axis-key":e.yAxisKey,"x-axis-key":e.xAxisKey,"x-axis-item-type-key":e.xAxisItemTypeKey,"x-axis-item-value-key":e.xAxisItemValueKey,"x-axis":e.xAxis,"y-axis":e.yAxis}})],1)],1)}),0)},i=[],a={render:r,staticRenderFns:i};t.a=a},4:function(e,t,n){"use strict";t.a={name:"SetPriceTable",props:{disabled:{type:Boolean,default:function(){return!1}},xAxis:{type:String},yAxis:{type:String},data:{type:Array,required:!0},placeholder:{type:String,default:"请填写金额"},yAxisKey:{type:String,default:"copyType"},xAxisKey:{type:String,default:"price"},xAxisItemTypeKey:{type:String,default:"hallType"},xAxisItemValueKey:{type:String,default:"money"}},data:function(){return{}},methods:{init:function(){},getXAxisArray:function(){return this.xAxis.split(",").filter(function(e){return e})},getYAxisArray:function(){return this.yAxis.split(",").filter(function(e){return e})},getTableData:function(){return this.getYAxisArray().map(function(e){return{yAxis:e}})},getPriceValue:function(e,t){var n=this,r=this.data.find(function(t){return t[n.yAxisKey]===e.yAxis}),i=void 0;return r&&(i=r[this.xAxisKey].find(function(e){return e[n.xAxisItemTypeKey]===t}))?i:{}}}}},5:function(e,t,n){"use strict";function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(i,a){try{var s=t[i](a),l=s.value}catch(e){return void n(e)}if(!s.done)return Promise.resolve(l).then(function(e){r("next",e)},function(e){r("throw",e)});e(l)}return r("next")})}}var i=n(18),a=(n.n(i),n(19)),s=n.n(a),l=n(20),o=(n.n(l),n(21)),u=n.n(o),c=n(22),d=n(26),p=n.n(d),f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.a={name:"ZmCollapseForm",props:{more:{type:Boolean,default:function(){return!0}},controls:{type:Boolean,default:!0},title:{type:String,default:"特殊方案规则"},rules:{type:Array,required:!0},autoAdd:{type:Boolean,default:!1},max:{type:Number,default:5},min:{type:Number,default:1},canEditName:{type:Boolean,default:!0}},data:function(){return{sortable:null,DivEmpty:c.a,Collapse:u.a,CollapseItem:s.a,collapseActive:0,sortLoading:!1}},computed:{outsideBox:function(){return this.more?u.a:c.a},insideBox:function(){return this.more?s.a:c.a},isControls:function(){return this.controls&&this.more},addDisabled:function(){return this.rules.length>=this.max}},mounted:function(){this.init()},methods:{init:function(){this.initData(),this.setSort()},initData:function(){var e=this.rules,t=e.length;this.more?!t&&this.autoAdd&&this.handleAdd():t||this.handleAdd()},preventClick:function(){},handleAdd:function(){this.$emit("click-add",this.rules)},handleEdit:function(e,t){this.$set(this.rules,t,f({},e,{isEdit:!0}))},handleEditAction:function(e,t){this.$set(this.rules,t,f({},e,{isEdit:!1}))},handelSort:function(e,t){var n=this;this.sortLoading=!0;var r=this.rules.splice(t,1),i="up"===e?t-1:t+1;this.$nextTick(function(){n.rules.splice(i,0,f({},r[0])),n.sortLoading=!1,n.$message({message:"操作成功",type:"success"})})},handelDel:function(e,t){var n=this;t||this.$confirm("是否确定删除该确认方案","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.sortLoading=!0,n.rules.splice(e,1),n.$nextTick(function(){n.sortLoading=!1,n.$message({message:"操作成功",type:"success"})})}).catch(function(){})},setSort:function(){var e=this;this.sortable&&!this.more||this.$nextTick(function(){var t=document.querySelectorAll(".SetPriceTableItemsHandle")[0],n=e;e.sortable=p.a.create(t,{draggable:".el-collapse",ghostClass:"sortable-ghost",handle:".drag-handle",setData:function(e){e.setData("Text","")},onEnd:function(){var i=r(regeneratorRuntime.mark(function r(i){var a,s,l,o,u,c,d;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=i.newIndex,s=i.oldIndex,a!==s){e.next=4;break}return e.abrupt("return");case 4:l=t.children[a],o=t.children[s],t.removeChild(l),a>s?t.insertBefore(l,o):t.insertBefore(l,o.nextSibling),u=n.rules,c=u.slice(0),d=c.splice(s-1,1)[0],n.rules.splice(s-1,1)[0],n.rules.splice(a-1,0,d);case 13:case"end":return e.stop()}},r,e)}));return function(e){return i.apply(this,arguments)}}()})})}}}},6:function(e,t,n){"use strict";t.a={name:"DivEmpty",data:function(){return{}},methods:{init:function(){}}}},75:function(e,t,n){"use strict";var r=n(34),i=n(14),a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.a={name:"SetPriceTableItemsHandle",components:{SetPriceTableItems:r.default,ZmCollapseForm:i.default},props:{more:{type:Boolean,default:function(){return!0}},title:{type:String,default:"特殊方案规则"},settlementType:{type:String,default:""},rules:{type:Array,required:!0},axisValuelKey:{type:String,default:"value"},allXAxis:{type:Array,required:!0},allYAxis:{type:Array,required:!0},disabled:{type:Boolean,default:function(){return!1}},xAxis:{type:String,required:!0},yAxis:{type:String,required:!0},placeholder:{type:String,default:"请填写金额"},yAxisKey:{type:String,default:"copyType"},xAxisKey:{type:String,default:"price"},xAxisItemTypeKey:{type:String,default:"hallType"},xAxisItemValueKey:{type:String,default:"money"}},data:function(){return{collapseActive:0,sortLoading:!1,item:{startTime:"",endTime:""}}},computed:{keys:function(){return this.createdKeys()}},mounted:function(){},methods:{handleAdd:function(e){console.log(e,"handleAdd");var t=a({},this.item);e.push(t)},createdKeys:function(){var e=[{label:"结算价格",value:"settlePriceRule",placeholder:"请填写结算金额"},{label:"影院服务费",value:"servicePriceRule",placeholder:"请填写影院服务费",noChange:!0}],t="";return"1"===this.settlementType?t="请填写增加金额":"2"===this.settlementType&&(t="请填写减少金额"),t&&e.forEach(function(e){e.noChange||(e.placeholder=t)}),e}}}},8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(9);r.a.install=function(e){return e.component(r.a.name,r.a)},t.default=r.a},9:function(e,t,n){"use strict";function r(e){n(10)}var i=n(4),a=n(12),s=n(0),l=r,o=s(i.a,a.a,!1,l,null,null);t.a=o.exports}})});