import{_ as n}from"./index.vue_vue_type_script_setup_true_lang-DXn5C4Bv.js";import{d as t,i as o,e as a,o as p}from"./index-BOXWD5iQ.js";const r=`# 组件介绍

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

# 外部交互

date组件通过defineExpose暴露内容与类型如下：
\`\`\`ts
const model = defineModel<VjfDateModel>({});
const props: ComputedRef<Readonly<LooseRequired<VjfDatePropsTotal>> & {} & Data>;
const datePickerRef = ref<InstanceType<typeof ElDatePicker>>();
defineExpose({
  model, // 值
  props,  // 参数
  datePickerRef // el-date-picker实例ref
});
\`\`\`
time组件通过defineExpose暴露内容与类型如下：
\`\`\`ts
const model = defineModel<VjfDateModel>({});
const props: ComputedRef<Readonly<LooseRequired<VjfDatePropsTotal>> & {} & Data>;
const timePickerRef = ref<InstanceType<typeof ElTimePicker>>();
defineExpose({
  model, // 值
  props,  // 参数
  timePickerRef // el-time-picker实例ref
});
\`\`\`

# 运行实例

参看[VjForm实例1](/#/form/)中相关项`,d=t({__name:"index",setup(i){return(s,f)=>{const e=n;return p(),o(e,{mdStr:a(r)},null,8,["mdStr"])}}});export{d as default};
