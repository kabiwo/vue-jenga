<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
console.log(route, router);
</script>

<template>
  <el-config-provider>
    <RouterView />
  </el-config-provider>
</template>