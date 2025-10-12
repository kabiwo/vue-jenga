import{_ as o}from"./index.vue_vue_type_script_setup_true_lang-Bx4jZDz8.js";import{d as e,i as r,e as s,o as t}from"./index-DX3DE4jv.js";const m=`# 组件介绍

自定义表单子项，用于在表单中加入自定义组件，以及默认展示文本

# 使用方法

在配置表单项时，以“custom”作为type参数传入，参数类型如下：

\`\`\`ts

export type VjfCustomProps = VjFormItemBase & { // 自定义
  type: "custom";
  skDefault?: string; // default插槽
  formatter?: (value: unknown, item: VjFormItemProps, model: Record<string, unknown>) => string; // 非插槽场景下对值进行格式化
  className?: string;  // 非插槽场景附加css样式类
};

\`\`\`

在插槽场景下，插槽scope具有参数{ _FormModel: props.model, _ItemProps: props, _code: props.code }，其中_ItemProps提供了组件所有注入的props，在VjfCustomProps之外的部分如下：

\`\`\`ts
export type VjFormItemAttach = {  // 父组件向子组件注入的附加参数
  labelMap: Record<string, string>; // 表单统一计算label字典传入表单项
  model: Record<string, unknown>; // 给子组件接收的回调函数传参
  rootModel: Record<string, unknown>; // 为split等多级表单场景统一收集model数据透传
  addItemRule: (key: string, rule: VjFormItemProps) => FormRules; // 允许子组件异步增加规则
  rmItemRule: (key: string) => FormRules; // 子组件异步移除规则
  addSubForm: (key: string, form: ElFormInsType) => Record<string, ElFormInsType>; // 子组件增加子表单，用于校验
  rmSubForm: (key: string) => Record<string, ElFormInsType>; // 子组件注销子表单，用于校验
  slots?: Slots;  // 透传slots
  disabled?: boolean; // 传入disabled结果
};
\`\`\`

# 运行实例

参看[VjForm实例1](/#/form/)中相关项`,i=e({__name:"index",setup(p){return(l,d)=>{const n=o;return t(),r(n,{mdStr:s(m)},null,8,["mdStr"])}}});export{i as default};
