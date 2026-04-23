import{_ as n}from"./index.vue_vue_type_script_setup_true_lang-BtNgMsF5.js";import{d as a,i as s,e as r,o}from"./index-DjaujtPh.js";const t=`# 组件介绍

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

# 外部交互

组件通过defineExpose暴露内容与类型如下：
\`\`\`ts
const model: ModelRef<VjfCascaderModel, string, VjfCascaderModel, VjfCascaderModel>;
const props: ComputedRef<Readonly<LooseRequired<VjfCascaderPropsTotal>> & {} & Data>;
const cascaderRef = ref<InstanceType<typeof ElCascader>>();
const cascaderPanelRef = ref<InstanceType<typeof ElCascaderPanel>>();

defineExpose({
  model,  // 绑定值
  props,  // 参数
  cascaderRef,  // el-cascader实例ref
  cascaderPanelRef   // el-cascader-panel实例ref
});
\`\`\`

# 运行实例

参看[VjForm实例1](/#/form/)中相关项`,i=a({__name:"index",setup(d){return(c,l)=>{const e=n;return o(),s(e,{mdStr:r(t)},null,8,["mdStr"])}}});export{i as default};
