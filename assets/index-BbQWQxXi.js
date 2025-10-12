import{_ as o}from"./index.vue_vue_type_script_setup_true_lang-Bx4jZDz8.js";import{d as n,i as t,e as p,o as r}from"./index-DX3DE4jv.js";const l=`# 组件介绍

用于进行选择的一系列组件，包括select、radio、checkbox，以及配置预处理的VjfcSelectMulti

# 使用方法

在配置表单项是，type为“select”是下拉选择，type为“radio”是单选，type为“checkbox”是复选，参数类型如下：

\`\`\`ts

export type VjfSelectProps = VjFormItemBase & {
  type: "select";
  options?: ((item: VjfSelectPropsTotal, model: Record<string, unknown>) => VjOptions) | VjOptions; // 选项
  elSelectProps?: ElPropsType<typeof ElSelect> | ElPropsType<typeof ElSelectV2> | ((item: VjfSelectPropsTotal, model: Record<string, unknown>) => ElPropsType<typeof ElSelect> | ElPropsType<typeof ElSelectV2>); // ElSelect参数
  elSelectEmit?: ElEventType<typeof ElSelect> | ElEventType<typeof ElSelectV2>; // ElSelect事件
  virtual?: boolean;  // 列表虚拟滚动

  onChangePrefix?: (options: VjOptions, value: unknown, item: VjfSelectPropsTotal, model: Record<string, unknown>) => unknown;  // 值传给onChange事件前进行预处理

  remote?: boolean; // 远程异步加载开关
  remoteFunc?: (params: {query: string}, item: VjfSelectPropsTotal, model: Record<string, unknown>) => Promise<VjOptions>;  // 远程加载函数
  remoteInitQuery?: boolean;  // 初始化加载开关
  remoteInitOptions?: (item: VjfSelectPropsTotal, model?: Record<string, unknown>) => Promise<VjOptions>; // 初始化默认选项
  remoteParamAttach?: Record<string, unknown> | ((item: VjfSelectPropsTotal, model: Record<string, unknown>) => Record<string, unknown>); // 远程加载附加参数

  skDefault?: string; // default插槽
  skHeader?: string;  // header插槽
  skFooter?: string;  // footer插槽
  skEmpty?: string; // empty插槽
  skPrefix?: string;  // prefix插槽
  skLoading?: string; // loading插槽
  skTag?: string; // tag插槽
  skLabel?: string; // label插槽

  skOptionDefault?: string; // option的default插槽
};

export type VjfRadioOption = VjOptionItem & { // 扩展VjOption
  elRadioProps?: ElPropsType<typeof ElRadio>; // ElRadio参数
  elRadioEmit?: ElEventType<typeof ElRadio>;  // ElRadio插槽
};

export type VjfRadioProps = VjFormItemBase & {
  type: "radio";
  button?: boolean; // 按钮模式
  options?: VjfRadioOption[] | ((item: VjfRadioProps, model: Record<string, unknown>) => VjfRadioOption[]); // 选项
  elRadioProps?: ElPropsType<typeof ElRadioGroup> | ((item: VjfRadioProps, model: Record<string, unknown>) => ElPropsType<typeof ElRadioGroup>);  // ElRadio参数
  elRadioEmit?: ElEventType<typeof ElRadioGroup>; // ElRadio事件
  skOptionDefault?: string; // option的default插槽
};

export type VjfCheckboxOption = VjOptionItem & {  // 扩展VjOption
  elCheckboxProps?: ElPropsType<typeof ElCheckbox>; // ElCheckbox参数
  elCheckboxEmit?: ElEventType<typeof ElCheckbox>;  // ElCheckbox事件
};

export type VjfCheckboxProps = VjFormItemBase & {
  type: "checkbox";
  button?: boolean; // 按钮模式
  options?: VjfCheckboxOption[] | ((item: VjfCheckboxProps, model: Record<string, unknown>) => VjfCheckboxOption[]);  // 选项
  // [Vue warn]: Invalid prop: type check failed for prop "options". Expected Function, got Array
  elCheckboxProps?: ElPropsType<typeof ElCheckboxGroup> | ((item: VjfCheckboxProps, model: Record<string, unknown>) => ElPropsType<typeof ElCheckboxGroup>);  // ElCheckbox参数
  elCheckboxEmit?: ElEventType<typeof ElCheckboxGroup>; // ElCheckbox事件
  skOptionDefault?: string; // option的default参数
};

\`\`\`

# 运行实例

参看[VjForm实例1](/#/form/)中相关项`,m=n({__name:"index",setup(i){return(s,a)=>{const e=o;return r(),t(e,{mdStr:p(l)},null,8,["mdStr"])}}});export{m as default};
