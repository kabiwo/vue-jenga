<template>
  <div>
    <ElButton @click="emit('call', props.name)">call {{ props.name }}</ElButton>
  </div>
</template>
<script setup lang="ts">

const props = defineProps<{
  name: string;
}>();

const emit = defineEmits<{
  call: [string]
}>();
</script>