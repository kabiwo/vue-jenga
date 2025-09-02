```html
<VjModal ref="modalRef">
  <div>modal</div>
</VjModal>
<el-button @click="modalRef.show()">显示弹窗</el-button>
```
```ts
import { ref } from 'vue';


const modalRef = ref();
```