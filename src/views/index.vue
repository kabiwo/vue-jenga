<template>
  <el-container class="vj-w-full vj-h-full">
    <el-header class="vj-flex vj-items-center">
      <div class="vj-font-size-3 vj-font-bold vj-font-italic">Vue Jenga</div>

    </el-header>
    <el-container class="vj-overflow-auto">
      <el-aside width="200px">
        <VjMenu :menus :el-props="elProps"/>
        <!-- <el-menu></el-menu> -->
      </el-aside>
      <el-main class="vj-overflow-auto">
        <RouterView/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { type VjMenuItem, type VjMenuProps } from 'vue-jenga/menu'
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
</script>