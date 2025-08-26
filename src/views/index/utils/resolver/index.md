# 组件介绍

为了适配vite的自动加载，以及解决element-plus的样式加载问题，定制了一个vite插件  

# 使用方法

在vite.config.ts中注册VjResolver来自动加载组件与样式（为了解决element-plus组件样式无法自动加载的问题）

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

在tsconfig.json中添加auto-imports.d.ts在includes当中以获得代码提示支持