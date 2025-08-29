<template>
  <VjForm ref="formRef" v-model="subModel" :rootModel="props.rootModel" :slots :elFormProps="p" v-bind="config">
  </VjForm>
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, watch } from "vue";
import { ref } from "vue";
import VjForm from "../../VjForm.vue";
import type { VjfSubModel, VjfSubPropsTotal } from ".";
import type { ElFormInsType, VjFormProps } from "../..";

const model = defineModel<VjfSubModel>({
  default: {},
});
const props = defineProps<VjfSubPropsTotal>();

const subModel = ref<Record<string, unknown>>({});

const slots = computed(() => {
  return props.slots || {};
});

const formRef = ref<ElFormInsType>();

const config = computed<VjFormProps>(() => {
  if (typeof props.subFormConf === "function") {
    return props.subFormConf(props, model.value);
  }
  return props.subFormConf || {};
});

const p = ref<VjFormProps["elFormProps"]>({
  inline: true,
  hideRequiredAsterisk: true,
  labelWidth: 0,
});

onMounted(() => {
  props.addSubForm(props.code, formRef.value!);
});
onUnmounted(() => {
  props.rmSubForm(props.code);
});

watch(model, (v) => {
  subModel.value = v;
}, {
  deep: true,
  immediate: true // 回显触发
});
watch(subModel, (v) => {
  model.value = v;
}, {
  deep: true,
});
</script>