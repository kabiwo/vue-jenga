# vue-jenga是什么

是我作为前端老油条，经历过数个框架之后，秉承配置化的复用思想，经过反复重构迭代所形成的一系列工具/组件集合  

其核心是对element-plus的表单/表格组件进行的二次封装，实现了表格与表单的配置化与灵活自定义，减少开发过程中的重复工作  

同时为了适配特定大屏场景，提供了等比缩放功能的配置开关  

另外为了便于日常工作，还纳入了一些简单的二次封装组件及工具函数/类型  

对于被封装的组件，都会尽可能暴露原始配置入口，以确保定制的灵活性，具体内容参看各组件文档    

# 安装与配置

1. 通过包管理器安装vue-jenga  

2. 按照提示，确保所需的peerDependencies已安装，目前有vue、element-plus与pinia  

3. 在main.ts中，引入初始化函数，并在app挂载后调用初始化函数VjInit  

```ts
      import { VjInit } from 'vue-jenga/utils'

      // ...无关代码

      app.mount('#app')  // 在此处之后进行初始化

      VjInit();
```
4. VjInit函数可接收配置参数，具体配置项拆分到各功能点详述  

5. 在vite.config.ts中注册VjResolver来自动加载组件与样式（为了解决element-plus组件样式无法自动加载的问题）

```ts
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
```

# 开发计划  

+ 弹框组件文档
+ 弹框组件开发
+ 表单组件文档
+ 表单组件开发
  + 表单子组件
+ 工具函数文档
+ 工具函数开发
+ ~~菜单组件文档~~
+ ~~菜单组件VjMenu~~
+ ~~表格组件文档~~
+ ~~表格组件VjTable~~
+ ~~开发工具链搭建~~