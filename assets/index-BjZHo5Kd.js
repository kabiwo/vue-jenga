import{_ as n}from"./index.vue_vue_type_script_setup_true_lang-CvVgCYEb.js";import{d as t,i as o,e as r,o as s}from"./index-tVMZFrV7.js";const l=`# 组件介绍

表单的树选择子项

# 使用方法

在配置表单项时，指定type为“treeselect”，参数类型如下：

\`\`\`ts

export type VjfTreeSelectProps = VjFormItemBase & {
  type: "treeselect";
  options?: ((item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => VjOptions) | VjOptions; // 选项
  elTreeSelectProps?: ElPropsType<typeof ElTreeSelect> | ((item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => ElPropsType<typeof ElTreeSelect>); // ElTreeSelect参数
  elTreeSelectEmit?: ElEventType<typeof ElTreeSelect>;  // ElTreeSelect事件

  onChangePrefix?: (options: VjOptions, value: unknown, item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => unknown;  // 在参数传入onChange事件前进行处理

  remote?: boolean; // 远程异步加载开关
  remoteFunc?: (params: {query: string}, item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => Promise<VjOptions>;  // 异步加载函数
  remoteInitQuery?: boolean;  // 初始化加载开关
  remoteInitOptions?: (item: VjfTreeSelectPropsTotal, model?: Record<string, unknown>) => Promise<VjOptions>; // 初始化默认选项
  remoteParamAttach?: Record<string, unknown> | ((item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => Record<string, unknown>); // 异步加载附加参数

  skDefault?: string; // default插槽
  skHeader?: string;  // header插槽
  skFooter?: string;  // footer插槽
  skEmpty?: string; // empty插槽
  skPrefix?: string;  // prefix插槽
  skLoading?: string; // loading插槽
  skTag?: string; // tag插槽
  skLabel?: string; // label插槽
};

\`\`\`

# 运行实例

参看[VjForm实例1](/#/form/)中相关项`,d=t({__name:"index",setup(i){return(m,p)=>{const e=n;return s(),o(e,{mdStr:r(l)},null,8,["mdStr"])}}});export{d as default};
