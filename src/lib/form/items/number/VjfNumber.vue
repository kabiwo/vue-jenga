<template>
  <div>
    <el-input-number v-model="model" :placeholder="props.placeholder" clearable v-bind="props.elNumberProps"
      :class="{ 'vj-w-full!': props.wfull }" @change="onChange" v-on:input="onInput" v-on="props.elNumberEmit || {}">
      <template #suffix v-if="props.skSuffix && slots[props.skSuffix]">
        <component :is="VjSlotRender(slots[props.skSuffix]!, { props, model })" />
      </template>
    </el-input-number>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { type VjfNumberModel, type VjfNumberPropsTotal } from ".";
import { VjSlotRender } from "../../../utils";
import { ElInputNumber } from "element-plus";

const emit = defineEmits<{
  clearValidate: [];
}>();

const model = defineModel<VjfNumberModel>();
const props = defineProps<VjfNumberPropsTotal>();

const slots = computed(() => {
  return props.slots || {};
});

const onInput = () => {
  emit("clearValidate");
};

const onChange = (value?: unknown) => {
  props.onChange && props.onChange(value, props, props.model!);
};
</script>
<style lang="css" scoped>
:deep .el-input__wrapper {
  --at-apply: vj-px-4
}
</style>