import{_ as e}from"./index.vue_vue_type_script_setup_true_lang-BPgZkEuw.js";import{d as t,i as o,e as p,o as s}from"./index-y3C4ZVii.js";const r=`# 组件介绍

此处收集了一些ts的工具类型，目前有：

ElEventType： 获取El组件的Emits类型，根据组件不同，有可能只拿到事件名，用于封装组件事件参数

ElModelType： 获取El组件的Model类型

ElPropsType： 获取El组件的props参数类型

VjOptionItem： 项目通用的兼容El的option类型，用于下拉列表、树等场景

VjOptions： VjOptionsItem的数组

VjOptionMap： 根据特定值反查VjOptionsItem的字典类型

ElSpanNum: 在用24格布局时的一些数字类型

# 类型说明

\`\`\`ts
export type ElEventType<T extends abstract new (...args: unknown[]) => any> = EventMap<EventFunc<T>>;

export type ElModelType<T extends abstract new (...args: unknown[]) => any> = InstanceType<T>["$props"]["modelValue"];

export type ElPropsType<T extends abstract new (...args: unknown[]) => any> = InstanceType<T>["$props"];

export type VjOptionItem<T = unknown, K = unknown> = {
  key?: string | number | symbol; // 唯一key
  label: string;  // 标签
  value: T; // 值
  disabled?: boolean; // 禁用（部分场景生效）
  children?: VjOptionItem<T, K>[];  // 子级
  isLeaf?: boolean; // 是否叶子节点
  source?: K; // 原始数据，生成VjOptionItem时可存至此字段，方便扩展
  [property: string]: unknown;
};
export type VjOptions<T = unknown, K = unknown> = VjOptionItem<T, K>[];
export type VjOptionMap<
  T extends string | number | symbol,
  K = unknown,
> = Record<T, VjOptionItem<K>>
\`\`\``,y=t({__name:"index",setup(a){return(l,i)=>{const n=e;return s(),o(n,{mdStr:p(r)},null,8,["mdStr"])}}});export{y as default};
