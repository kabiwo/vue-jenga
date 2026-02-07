<template>
  <div>
    <el-input-number ref="inputNumberRef" v-model="model" :placeholder="props.placeholder" clearable v-bind="props.elNumberProps"
      :class="{ 'vj-w-full!': props.wfull }" @change="onChange" v-on:input="onInput" v-on="props.elNumberEmit || {}">
      <template #suffix v-if="props.skSuffix && slots[props.skSuffix]">
        <component :is="VjSlotRender(slots[props.skSuffix]!, { props, model })" />
      </template>
    </el-input-number>
  </div>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import { type VjfNumberModel, type VjfNumberPropsTotal } from ".";
import { VjSlotRender } from "../../../utils";
import { ElInputNumber } from "element-plus";
import { ref } from "vue";

const emit = defineEmits<{
  clearValidate: [];
}>();

const model = defineModel<VjfNumberModel>();
const p = defineProps<VjfNumberPropsTotal>();
const attrs = useAttrs();
const props = computed(() => {return Object.assign({}, p, attrs)});

const inputNumberRef = ref<InstanceType<typeof ElInputNumber>>();

const slots = computed(() => {
  return props.value.slots || {};
});

const onInput = () => {
  emit("clearValidate");
};

const onChange = (value?: unknown) => {
  props.value.onChange && props.value.onChange(value, props.value, props.value.model!);
};

defineExpose({
  model,
  props,
  inputNumberRef
});
</script>
<style lang="css" scoped>
:deep .el-input__wrapper {
  --at-apply: vj-px-4
}
</style>