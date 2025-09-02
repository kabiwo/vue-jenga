```html
  <VjModalForm ref="modalRef" :formProps>

  </VjModalForm>
  <el-button @click="modalRef.show()">显示弹窗</el-button>
```
```ts
import { ref } from 'vue';
import type { VjFormProps } from 'vue-jenga/form';


const modalRef = ref();

const formProps = ref<VjFormProps>({
  form: [
    {
      label: 'a',
      code: 'a',
      required: true
    },
    {
      label: 'b',
      code: 'b',
      required: true,
      type: 'number'
    }
  ]
})
```