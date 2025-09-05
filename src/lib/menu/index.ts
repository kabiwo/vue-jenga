import VjMenu from './VjMenu.vue';

export { VjMenu };

import { type MenuProps, type MenuEmits, type MenuItemEmits, type MenuItemProps, type SubMenuProps } from 'element-plus'; 

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