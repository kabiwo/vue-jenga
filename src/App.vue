<template>
  <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const route = useRoute();
const router = useRouter();
console.log(route, router);
</script>
