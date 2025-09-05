import{_ as t}from"./index.vue_vue_type_script_setup_true_lang-BPgZkEuw.js";import{d as e,i as p,e as o,o as r}from"./index-y3C4ZVii.js";const s=`# 组件介绍

用于展示输入类的表单子项，包括输入框、文本域、数字输入框、开关

# 使用方法

在配置表单时，不传type参数则默认为输入框，将“number”传入type参数为数字输入框，将“switch”传入type参数则为切换开关，采用VjfcTextarea预配置为文本域，

参数类型如下：

\`\`\`ts

export type VjfInputProps = VjFormItemBase & {
  type: "input";
  elInputProps?: ElPropsType<typeof ElInput>; // ElInput参数
  elInputEmit?: ElEventType<typeof ElInput>;  // ElInput事件
  skAppend?: string;  // append插槽
};

const VjfcTextarea: (conf: Omit<VjfInputProps, "type">) => VjfInputProps

export type VjfNumberProps = VjFormItemBase & {
  type: "number";
  elNumberProps?: ElPropsType<typeof ElInputNumber>; // ElNumber参数
  elNumberEmit?: ElEventType<typeof ElInputNumber>; // ElNumber事件
  skSuffix?: string;  // suffix插槽
  wfull?: boolean;  // 是否占满容器宽度
};

export type VjfSwitchProps = VjFormItemBase & {
  type: "switch";
  elSwitchProps?: ElPropsType<typeof ElSwitch>; // ElSwitch参数
  elSwitchEmit?: ElEventType<typeof ElSwitch>;  // ElSwitch事件
  skActiveAction?: string;  // active-action插槽
  skInactiveAction?: string;  // inactive-action插槽
};

\`\`\`

# 运行实例

参看[VjForm实例1](/#/form/)中相关项`,a=e({__name:"index",setup(i){return(m,c)=>{const n=t;return r(),p(n,{mdStr:o(s)},null,8,["mdStr"])}}});export{a as default};
