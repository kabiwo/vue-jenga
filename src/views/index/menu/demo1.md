
```html
<div class="vj-w-30%">
  <VjMenu :menus :el-props="elProps"/>
</div>
```

```ts
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
```