import{_ as e}from"./index.vue_vue_type_script_setup_true_lang-DiUW72pF.js";import{d as o,i as t,e as s,o as r}from"./index-DHKqtlqR.js";const m=`# 组件介绍

vue-jenga的全局配置store，提供了配置类型与操作方法，涵盖了全局等比缩放相关计算属性  

提供类型VjConf，基于pinia的useVjConfStore  

等比缩放相关设计思路见下方段落说明  

# 使用方法

初始化配置时VjInit已对useVjConfStore进行初始化，可在初始化时传入配置  

在页面开发过程中，可以引用useVjConfStore来获取配置以及等比缩放相关响应式数据  

\`\`\`ts
// import { useVjConfStore } from "vue-jenga/utils";
const conf = useVjConfStore();
\`\`\`

在vite打包时，要使用postcss插件将项目中的px单位转换成rem，此处是静态配置，如有变更请与vite配置文件中修改

\`\`\`ts
import { defineConfig, type PluginOption } from 'vite'
import postCssPxToRem from "postcss-pxtorem"
export default defineConfig({
  ...
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 40,  // 设计图基准字号40px
          propList: ["*"],
          selectorBlackList: [],
        })
      ]
    }
  },
  ...
})
\`\`\`

# 类型说明

\`\`\`ts
export type VjConf = {
  remEnable: boolean; // 等比缩放开关，默认开启
  baseWidowWidth: number; // 设计图基准宽度(默认1920，px单位）
  baseFont: number; // 设计图根元素基准字号（默认40，单位px）
};

// conf类型
{
    setConf: (config: Partial<VjConf>) => void; // 写入配置
    getConf: () => VjConf;  // 获取配置;
    resetConf: () => void;  // 重置为默认配置
    rootFont: ComputedRef<number>;  // 当前页面尺寸下与设计比例相同的根元素基准字号
    root10px: ComputedRef<number>;  // 当前页面尺寸下与设计比例相同的相当于设计尺寸10px的基准单位
    scaleRate: ComputedRef<number>; // 当前页面尺寸相对于设计尺寸的比例
    getScaledNum: (num: number) => number;  // 设计尺寸数值向当前页面尺寸进行换算
}
\`\`\`

# 等比缩放说明

由于在大屏/高分辨率屏幕下，容易出现样式不协调、页面元素比例错乱的问题  

经过多个项目的迭代尝试，确认了一套基于rem的等比缩放方案，基于postcss插件对全局css进行了处理  

但是在特定场景下需要手动处理，例如对echarts（基于canvas）中数值尺寸（不支持rem）的转换，下面进行详细说明  

由于采用了unocss，其常见的样式单位（例如： m-1对应的是margin: 0.25rem）对应的是0.25rem  

为了降低从设计图到unocss样式单位转换的心智负担，默认的设计图基准字号设为40px，即baseFont为40

这样m-1就相当于是设计图上的margin： 10px效果，并且会随着页面尺寸等比缩放  

在需要进行尺寸计算的场景：  

比如echarts中的字号等都是数值，不会跟随rem变化而改变，因此在设置时，可以响应式赋值（computed或者监听页面resize等），从useVjConfStore中使用getScaledNum方法，传入设计图上的数值，获取当前值，然后重绘echarts图表即可  

比如项目中某些组件对于尺寸进行了封装，传入值是等效于设计图的10px的倍数，便用到了useVjConfStore中的root10px响应值来进行计算

在计算缩放比例时，默认地考虑到了鼠标滚轮的缩放影响，但由于浏览器边框的存在，计算是近似值，存在误差，请知悉



`,c=o({__name:"index",setup(p){return(a,u)=>{const n=e;return r(),t(n,{mdStr:s(m)},null,8,["mdStr"])}}});export{c as default};
