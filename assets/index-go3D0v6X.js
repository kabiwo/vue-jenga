import{_ as e}from"./index.vue_vue_type_script_setup_true_lang-BkQRyxLZ.js";import{d as a,i as r,e as s,o}from"./index-CaRpFLgX.js";const t=`# 组件介绍

级联表单子项，用于层级数据选取

# 使用方法

在配置表单项时，以“cascader”作为type参数传入，参数类型如下：

\`\`\`ts
export type ElCascaderLazyLoad = (node: CascaderNode, resolve: Resolve) => void;

export type VjfCascaderProps = VjFormItemBase & {
  type: "cascader";
  options?: VjOptions<string | number>; // 静态选项
  props?: CascaderProps;  // El的cascader参数
  lazyLoad?: ElCascaderLazyLoad;  // 异步加载方法
  lazyLoadFunc?: (item: VjfCascaderPropsTotal, model: Record<string, unknown>) => ElCascaderLazyLoad; // 可以接受表单参数的异步加载方法
  elCascaderProps?: ElPropsType<typeof ElCascader> | ElPropsType<typeof ElCascaderPanel>; // ElCascader参数
  elCascaderEmit?: Record<string, (...args: unknown[]) => unknown>; // ElCascader事件

  panel?: boolean;  // 非下拉模式
  lazy?: boolean; // 开启异步加载节点

  skDefault?: string; // default插槽
  skHeader?: string;  // header插槽
  skFooter?: string;  // footer插槽
  skEmpty?: string; // empty插槽
  skPrefix?: string;  // prefix插槽
  skSuggestionItem?: string;  // suggestion-item插槽
  skTag?: string; // tag插槽
};

\`\`\`

# 运行实例

参看[VjForm实例1](/#/form/)中相关项`,m=a({__name:"index",setup(d){return(c,p)=>{const n=e;return o(),r(n,{mdStr:s(t)},null,8,["mdStr"])}}});export{m as default};
