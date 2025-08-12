<template>
  <div>
    <VjForm />
  </div>
</template>
<script lang="ts" setup>
import { VjForm } from 'vue-jenga/form'
import axios from 'axios';


axios.get('/admin/dashboard/geturl?id=1')
.then(response => {
console.log('用户列表:', response.data);
})
.catch(error => {
console.error('请求出错:', error);
});
</script>