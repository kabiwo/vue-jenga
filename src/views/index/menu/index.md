# 组件介绍

菜单组件VjMenu，是对ElMenu的二次封装，可以根据特定类型的对象数组渲染出菜单  

提供类型VjMenuItem，VjMenuProps

# 使用方法

从vue-jenga包中引入VjMenu与所用类型，填写参数并在模板中使用

```html
<VjMenu :menus :el-props="elProps"/>
```

```ts
import { VjMenu, type VjMenuItem, type VjMenuProps } from 'vue-jenga/menu'
```

# 外部交互

组件通过defineExpose暴露内容与类型如下：
```ts
const elMenuRef = ref<InstanceType<typeof ElMenu>>();

defineExpose({
  elMenuRef
})
```

# 类型说明

```ts
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
};
```

# 运行实例