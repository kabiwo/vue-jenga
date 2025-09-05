import{_ as o}from"./index.vue_vue_type_script_setup_true_lang-BPgZkEuw.js";import{d as t,i as r,e as s,o as e}from"./index-y3C4ZVii.js";const m=`# 组件介绍

这里搜集了一些数据转换与生成的方法，目前有：  

VjOptionsFromEnum： 根据Enum类型和字典生成对应的VjOptions选项

_VjOnEmitsFromEmits： 内部方法，用于给省略了on的事件绑定参数在渲染函数中增加上on

VjObjDeepMerge: 深度合并对象，返回新对象，不会对原对象进行操作

# 使用方法

直接调用

# 类型说明

\`\`\`ts
const VjOptionsFromEnum: <K>(E: K, map: Record<string, string>) => VjOptions<K>

const _VjOnEmitsFromEmits: <T extends Record<string, unknown>>(source: T) => T

const VjObjDeepMerge: (...args: Record<string, unknown>[]) => Record<string, unknown>
\`\`\`
`,d=t({__name:"index",setup(c){return(i,p)=>{const n=o;return e(),r(n,{mdStr:s(m)},null,8,["mdStr"])}}});export{d as default};
