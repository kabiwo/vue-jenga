import VjMenu from './VjMenu.vue';

export { VjMenu };

import { type MenuProps } from 'element-plus'; 

export type VjMenuItem = {
  name: string;
  path: string;
  icon?: string;
  group?: boolean;
  children?: VjMenuItem[] | null;
};

export type VjMenuProps = {
  elProps?: Partial<MenuProps>;
  menus: VjMenuItem[]
};