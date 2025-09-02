<template>
<markdown :mdStr />
<VjModal ref="modalRef">
  <div>modal</div>
</VjModal>
<el-button @click="modalRef.show()">显示弹窗</el-button>
<markdown :mdStr="demo1" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import mdStr from './index.md?raw'
import demo1 from './demo1.md?raw'


const modalRef = ref();



</script>