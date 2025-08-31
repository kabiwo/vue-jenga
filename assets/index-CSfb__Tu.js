import{_ as e}from"./index.vue_vue_type_script_setup_true_lang-6twE-pCU.js";import{d as o,i as t,e as s,o as r}from"./index-CO22PCF-.js";const m=`# 组件介绍

为了适配vite的自动加载，以及解决element-plus的样式加载问题，定制了一个vite插件  

# 使用方法

在vite.config.ts中注册VjResolver来自动加载组件与样式（为了解决element-plus组件样式无法自动加载的问题）

\`\`\`ts
      import AutoImport from 'unplugin-auto-import/vite'
      import Components from 'unplugin-vue-components/vite'
      import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
      import { VjResolver } from 'vue-jenga/utils'
      export default defineConfig({
        // 无关代码
        plugins: [
          // 无关代码
          AutoImport({
            // 无关代码
            resolvers: [
              VjResolver(),
              ElementPlusResolver({
                importStyle: 'css',
                directives: true
              })
              // 无关代码
            ],
          }),
          Components({
            resolvers: [
              VjResolver(),
              ElementPlusResolver({
                importStyle: 'css',
                directives: true
              }), 
              // 无关代码
            ],
          }),
          // 无关代码
        ],
      });
\`\`\`

在tsconfig.json中添加auto-imports.d.ts在includes当中以获得代码提示支持`,v=o({__name:"index",setup(l){return(i,p)=>{const n=e;return r(),t(n,{mdStr:s(m)},null,8,["mdStr"])}}});export{v as default};
