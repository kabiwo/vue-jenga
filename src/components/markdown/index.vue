<template>
  <div class="markdown-box" v-html="html"></div>
</template>
<script setup lang="ts">
import { useMdStore } from '../../store/md.store';

import { ref, watch } from 'vue'

const props = defineProps<{
  mdStr: string
}>();

const {render} = useMdStore()

const html = ref('');

watch(props, async (v) => {
  html.value = await render(v.mdStr || '');
}, {
  immediate: true
});
</script>