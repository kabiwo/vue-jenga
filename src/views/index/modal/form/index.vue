<template>
  <markdown :mdStr />
  <VjModalForm ref="modalRef" :formProps>

  </VjModalForm>
  <el-button @click="modalRef.show()">显示弹窗</el-button>
  <markdown :mdStr="demo1" />
</template>
<script lang="ts" setup>
import mdStr from './index.md?raw';
import demo1 from './demo1.md?raw';

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
</script>