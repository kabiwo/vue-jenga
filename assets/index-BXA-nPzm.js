import{_ as t}from"./index.vue_vue_type_script_setup_true_lang-sL8bRyZN.js";import{d as o,i as e,e as a,o as r}from"./index-BlcAyLQn.js";const m=`# 组件介绍

提供VjInit方法，供在项目初始化时对vue-jenga进行初始化  

未来会逐渐收集vue-jenga的全局配置，当前仅有页面等比缩放相关配置  

# 使用方法

在main.ts中，引入初始化函数，并在app挂载后调用初始化函数VjInit  

\`\`\`ts
      // import { VjInit } from 'vue-jenga/utils'

      // ...无关代码

      app.mount('#app')  // 在此处之后进行初始化

      VjInit();
\`\`\`

VjInit当前仅可选地接收VjConf类型参数，详见[VjConf](/utils/conf)`,u=o({__name:"index",setup(s){return(i,p)=>{const n=t;return r(),e(n,{mdStr:a(m)},null,8,["mdStr"])}}});export{u as default};
