<template>

<VjModal ref="modalRef">
  <div>modal</div>
</VjModal>
<el-button @click="modalRef.show()">显示弹窗</el-button>
  
</template>
<script setup lang="ts">
import { ref } from 'vue';


const modalRef = ref();



</script>