<template>
  <div>
    <el-input v-model="model" :placeholder="props.placeholder" clearable @change="onChange" v-bind="props.elInputProps"
      v-on="props.elInputEmit || {}" :disabled="props.disabled">
      <template v-if="props.skPrefix && slots[props.skPrefix]" #prefix>
        <component :is="VjSlotRender(slots[props.skPrefix]!, { model, props })" />
      </template>
      <template v-if="props.skSuffix && slots[props.skSuffix]" #suffix>
        <component :is="VjSlotRender(slots[props.skSuffix]!, { model, props })" />
      </template>
      <template v-if="props.skPrepend && slots[props.skPrepend]" #prepend>
        <component :is="VjSlotRender(slots[props.skPrepend]!, { model, props })" />
      </template>
      <template v-if="props.skAppend && slots[props.skAppend]" #append>
        <component :is="VjSlotRender(slots[props.skAppend]!, { model, props })" />
      </template>
    </el-input>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { ElInput } from 'element-plus';
import type { VjfInputModel, VjfInputPropsTotal } from ".";
import { VjSlotRender } from "../../../utils";

const model = defineModel<VjfInputModel>();
const props = defineProps<VjfInputPropsTotal>();

const slots = computed(() => {
  return props.slots || {};
});

const onChange = (value?: unknown) => {
  props.onChange && props.onChange(value, props, props.model!);
};
</script>