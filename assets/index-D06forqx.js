import{H as s}from"./menu-xKiYotMO.js";import{d as r,c as p,h as a,b as l,k as n,l as i,e as t,F as M,o as c,p as f}from"./index-DX3DE4jv.js";import"./el-popper-0cytxVH1.js";import"./el-tooltip-l0sNRNKZ.js";import{_ as d}from"./index.vue_vue_type_script_setup_true_lang-Bx4jZDz8.js";import"./generator-nQ7uPD3I-ClvTNe9C.js";import"./string-CEni-xdW-DwWwxVxW.js";const j=`# 组件介绍

菜单组件VjMenu，是对ElMenu的二次封装，可以根据特定类型的对象数组渲染出菜单  

提供类型VjMenuItem，VjMenuProps

# 使用方法

从vue-jenga包中引入VjMenu与所用类型，填写参数并在模板中使用

\`\`\`html
<VjMenu :menus :el-props="elProps"/>
\`\`\`

\`\`\`ts
import { VjMenu, type VjMenuItem, type VjMenuProps } from 'vue-jenga/menu'
\`\`\`

# 外部交互

组件通过defineExpose暴露内容与类型如下：
\`\`\`ts
const elMenuRef = ref<InstanceType<typeof ElMenu>>();

defineExpose({
  elMenuRef
})
\`\`\`

# 类型说明

\`\`\`ts
import { type MenuProps, type MenuEmits, type MenuItemEmits } from 'element-plus'; 

export type VjMenuItem = {  // 菜单配置项
  name: string; // 菜单名
  path: string; // 路由路径
  icon?: string;  // 图标
  group?: boolean;  // 分组情况
  elItemProps?: Partial<MenuItemProps>; // ElMenuItem参数
  elItemEmits?: Partial<MenuItemEmits>; // ElMenuItem事件
  elSubProps?: Partial<SubMenuProps>; // ElSubMenu参数
  children?: VjMenuItem[] | null;
};

export type VjMenuProps = { // 组件接收参数
  elProps?: Partial<MenuProps>; // ElMenu参数
  elEmits?: Partial<MenuEmits>; // ElMenu事件
  menus: VjMenuItem[];  // 菜单配置项数组
  iconFunc?: (item: VjMenuItem) => string;  // 菜单图标处理函数返回值作为图标ElIcon的class
};
\`\`\`

# 运行实例`,P=`
\`\`\`html
<div class="vj-w-30%">
  <VjMenu :menus :el-props="elProps"/>
</div>
\`\`\`

\`\`\`ts
import { computed, ref } from 'vue';
import { VjMenu, type VjMenuItem, type VjMenuProps } from 'vue-jenga/menu'
import { useRoute } from 'vue-router';

const elProps = computed<VjMenuProps['elProps']>(() => ({
  router: true,
  defaultActive: useRoute()?.path
}));

const menus = ref<VjMenuItem[]>([
  {
    name: '概述',
    path: '/',
  }, 
  {
    name: 'Form',
    path: '/form'
  },
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Table',
    path: '/table'
  },
  {
    name: 'Utils',
    path: '/utils'
  }
]);
\`\`\``,V={class:"vj-w-30%"},F=r({__name:"index",setup(h){const o=p(()=>({router:!0,defaultActive:f()?.path})),u=a([{name:"概述",path:"/"},{name:"Form",path:"/form"},{name:"Menu",path:"/menu"},{name:"Table",path:"/table"},{name:"Utils",path:"/utils"}]);return(E,I)=>{const e=d,m=s;return c(),l(M,null,[n(e,{mdStr:t(j)},null,8,["mdStr"]),i("div",V,[n(m,{menus:u.value,"el-props":o.value},null,8,["menus","el-props"])]),n(e,{mdStr:t(P)},null,8,["mdStr"])],64)}}});export{F as default};
