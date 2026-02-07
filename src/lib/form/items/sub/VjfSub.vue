<template>
  <VjForm ref="formRef" v-model="subModel" :rootModel="props.rootModel" :slots :elFormProps="pr" v-bind="config">
  </VjForm>
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, useAttrs, watch } from "vue";
import { ref } from "vue";
import VjForm from "../../VjForm.vue";
import type { VjfSubModel, VjfSubPropsTotal } from ".";
import type { ElFormInsType, VjFormProps } from "../..";

const model = defineModel<VjfSubModel>({
  default: {},
});
const p = defineProps<VjfSubPropsTotal>();
const attrs = useAttrs();
const props = computed(() => {return Object.assign({}, p, attrs)});

const subModel = ref<Record<string, unknown>>({});

const slots = computed(() => {
  return props.value.slots || {};
});

const formRef = ref<ElFormInsType>();

const config = computed<VjFormProps>(() => {
  if (typeof props.value.subFormConf === "function") {
    return props.value.subFormConf(props.value, model.value);
  }
  return props.value.subFormConf || {};
});

const pr = ref<VjFormProps["elFormProps"]>({
  inline: true,
  hideRequiredAsterisk: true,
  labelWidth: 0,
});

onMounted(() => {
  props.value.addSubForm(props.value.code, formRef.value!);
});
onUnmounted(() => {
  props.value.rmSubForm(props.value.code);
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

defineExpose({
  model, // 值
  props,  // 参数
  formRef // 子VjForm实例ref
});
</script>