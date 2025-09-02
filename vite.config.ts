import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import vueDevTools from "vite-plugin-vue-devtools"
import VueRouter from "unplugin-vue-router/vite"
import { VueRouterAutoImports } from "unplugin-vue-router"
import postCssPxToRem from "postcss-pxtorem"
import ElementPlus from 'unplugin-element-plus/vite'

// import { ElementPlusResolver } from './element-plus-resolver'
import { VjResolver } from 'vue-jenga/utils'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    ElementPlus({}),
    AutoImport({
      imports: [
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          "vue-router/auto": ["useLink"],
        },
      ],
      resolvers: [
        VjResolver(),
        ElementPlusResolver({
          // importStyle: 'css',
          directives: true
        })
      ],
    }),
    Components({
      resolvers: [
        VjResolver(),
        ElementPlusResolver({
          // importStyle: 'css',
          directives: true
        }), 
        VantResolver()],
    }),
    UnoCSS() as PluginOption,
    vueDevTools(),
    VueRouter({
      routesFolder: "src/views",
      exclude: ["**/_source/*.*"],
      extensions: [".vue"],
      importMode: "async",
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 40,
          propList: ["*"],
          selectorBlackList: [],
        })
      ]
    }
  },
  build: {
    outDir: 'dist-doc', // 修改输出目录为 custom-dist
  }
})
