import{_ as o}from"./index.vue_vue_type_script_setup_true_lang-Cr0H1kQT.js";import{d as e,i as r,e as s,o as t}from"./index-mOBMqkBo.js";const m=`# 组件介绍

表单的嵌套表单子项

# 使用方法

配置表单项时，指定type为“sub”，参数类型如下： 

\`\`\`ts
export type VjfSubProps = VjFormItemBase & {
  type: "sub";
  subFormConf?: VjFormProps | ((props: VjfSubPropsTotal, model: VjfSubModel) => VjFormProps); // 子表单的配置
};

\`\`\`

# 外部交互

组件通过defineExpose暴露如下内容  

\`\`\`ts
defineExpose({
  model, // 值
  props,  // 参数
  formRef // 子VjForm实例ref
});
\`\`\`

# 运行实例

参看[VjForm实例1](/#/form/)中相关项`,c=e({__name:"index",setup(p){return(f,a)=>{const n=o;return t(),r(n,{mdStr:s(m)},null,8,["mdStr"])}}});export{c as default};
