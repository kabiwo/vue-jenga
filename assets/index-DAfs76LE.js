import{_ as n}from"./index.vue_vue_type_script_setup_true_lang-BMgYZb-1.js";import{d as t,i as o,e as r,o as p}from"./index-Dss3JQ3B.js";const s=`# 组件介绍

用于循环生成表单子项，减轻雷同表单项的配置负担

# 使用方法

在配置表格时，指定参数type为“repeat”，参数类型如下

\`\`\`ts

export type VjfRepeatProps = VjFormItemBase & { // 循环生成
  type: "repeat";
  repeatItems?: VjFormItemProps[] | ((props: VjfRepeatProps, model: Record<string, unknown>) => VjFormItemProps[]); // 循环项
};
\`\`\`
`,f=t({__name:"index",setup(m){return(a,c)=>{const e=n;return p(),o(e,{mdStr:r(s)},null,8,["mdStr"])}}});export{f as default};
