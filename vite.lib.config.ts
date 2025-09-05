import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'

const components = {
  form: 'src/lib/form/index.ts',
  table: 'src/lib/table/index.ts',
  modal: 'src/lib/modal/index.ts',
  utils: 'src/lib/utils/index.ts',
  menu: 'src/lib/menu/index.ts'
}

export default defineConfig({
  plugins: [
    vue({
      // isProduction: true,
    }),
    UnoCSS({
      mode: 'global', // 使用全局模式
      configFile: './uno.lib.config.ts' // 明确指定配置文件
    }),
    dts({
      tsconfigPath: 'tsconfig.lib.json',
      outDir: './dist/types',
      // entryRoot: './src/lib',
      // exclude: ['node_modules', 'vite.config.ts'],
      include: ['./src/lib']
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: components,
      formats: ['es']
      // name: 'MyLib',
      // the proper extensions will be added
      // fileName: 'my-lib'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus', 'pinia', 'axios'],
      output: {
        exports: 'named',
        interop: 'auto'
        // preserveModules: true
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        // globals: {
        //   vue: 'Vue'
        // }
      }
    }
  }
})