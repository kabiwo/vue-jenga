import VjMenu from './VjMenu.vue';

export { VjMenu };

import { type MenuProps, type MenuEmits, type MenuItemEmits, type MenuItemProps, type SubMenuProps } from 'element-plus'; 

export type VjMenuItem = {
  name: string;
  path: string;
  icon?: string;
  group?: boolean;
  elItemProps?: Partial<MenuItemProps>;
  elItemEmits?: Partial<MenuItemEmits>;
  elSubProps?: Partial<SubMenuProps>;
  children?: VjMenuItem[] | null;
};

export type VjMenuProps = {
  elProps?: Partial<MenuProps>;
  elEmits?: Partial<MenuEmits>;
  menus: VjMenuItem[];
};