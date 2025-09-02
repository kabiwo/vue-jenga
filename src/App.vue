<template>
  <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { onMounted } from 'vue';
const route = useRoute();
const router = useRouter();

onMounted(() => {
  // 检查 sessionStorage 中是否有重定向路径
  const redirectPath = sessionStorage.getItem('redirect');
  if (redirectPath) {
    // 清除存储的路径
    sessionStorage.removeItem('redirect');
    // 跳转到原始路径
    router.push(redirectPath);
  }
});
</script>
