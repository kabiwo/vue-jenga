<template>
  <markdown :mdStr/>

  <div class="vj-h-30"> <!-- 有高度限制的外部容器 -->
      <vj-fold-link :links="links" :num="3">
      </vj-fold-link>
  </div>

  <markdown :mdStr="demo1" />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import mdStr from './index.md?raw'
import demo1 from './demo1.md?raw'
import {list} from 'radash'

const links = ref(list(0, 20, i => {
  return {
    label: `link${i + 1}`,
    func: () => alert(`link${i + 1}`)
  };
}));

onMounted(() => {
  console.log(links);
});

</script>