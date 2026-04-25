import{_ as o}from"./index.vue_vue_type_script_setup_true_lang-Bmt5bp4N.js";import{d as e,i as t,e as r,o as m}from"./index-wjI9uMzd.js";const p=`# 组件介绍

利用sub子form实现的为任意组件增加multi模式，可以有交互地增减克隆项

# 使用方法

在配置表格时，指定参数type为“multi”，参数类型如下

\`\`\`ts

export type VjfMultiModel = unknown[];

export type VjfMultiProps = VjFormItemBase & {
  type: "multi";
  multiItemConf: VjFormItemProps | ((props: VjfMultiPropsTotal, model: VjfMultiModel) => VjFormItemProps); // 子表单的配置
  multiItemDefaultValue: () => unknown; // 设置每个子项的默认值
  onLengthChange?: (index: number, type: 'add' | 'del', scope: {  // 变更回调，返回true则保持默认增减
    props: VjfMultiPropsTotal;
    model: VjfMultiModel;
  }, attach?: unknown ) => boolean;
  multiSpan?: number; // 按钮占位
};

export type VjfMultiPropsTotal = VjFormItemAttach & VjfMultiProps;
\`\`\`

# 外部交互

组件通过defineExpose暴露如下内容  

\`\`\`ts
const add: (index: number, attach?: unknown) => void;
const del: (index: number, attach?: unknown) => void;
defineExpose({
  model,  // 值
  props,  // 参数
  formRef,  // 子vjForm的实例ref
  add,  // 增加一条
  del // 删除一条
});
\`\`\`


# 运行实例

参看[VjForm实例1](/#/form/)中相关项
`,i=e({__name:"index",setup(l){return(u,a)=>{const n=o;return m(),t(n,{mdStr:r(p)},null,8,["mdStr"])}}});export{i as default};
