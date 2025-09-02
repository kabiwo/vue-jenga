import{_ as t}from"./index.vue_vue_type_script_setup_true_lang-BMgYZb-1.js";import{d as n,i as a,e as o,o as m}from"./index-Dss3JQ3B.js";const p=`# 组件介绍

用于展示日期类表单组件，包含date与time，以及配置预处理的datetime、datetime-range、date-range

# 使用方法

在配置表单项时，以“time”作为type参数传入，则为时间选择，以“date”作为type参数传入，则为日期选择  

另有预定义配置函数VjfcDateRange、VjfcDatetime、VjfcDatetimeRange分别提供日期范围、日期时间以及日期时间范围  

参数类型如下：

\`\`\`ts

export type VjfTimeProps = VjFormItemBase & {
  type: "time";
  elTimeProps?: ElPropsType<typeof ElTimePicker>; // ElTime参数
  elTimeEmit?: ElEventType<typeof ElTimePicker>;  // ElTime事件
};

export type VjfDateProps = VjFormItemBase & {
  type: "date";
  elDateProps?: ElPropsType<typeof ElDatePicker>; // ElDate参数
  elDateEmit?: ElEventType<typeof ElDatePicker>;  // ElDate事件
};

const VjfcDateRange: (conf: Omit<VjfDateProps, "type">) => VjfDateProps

const VjfcDatetime: (conf: Omit<VjfDateProps, "type">) => VjfDateProps

const VjfcDatetimeRange: (conf: Omit<VjfDateProps, "type">) => VjfDateProps

\`\`\`


# 运行实例

参看[VjForm实例1](/#/form/)中相关项`,l=n({__name:"index",setup(r){return(i,s)=>{const e=t;return m(),a(e,{mdStr:o(p)},null,8,["mdStr"])}}});export{l as default};
