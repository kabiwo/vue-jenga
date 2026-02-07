<template>
  <div>
    <el-input ref="inputRef" v-model="model" :placeholder="props.placeholder" clearable @change="onChange" v-bind="props.elInputProps"
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
import { computed, ref, useAttrs } from "vue";
import { ElInput } from 'element-plus';
import type { VjfInputModel, VjfInputPropsTotal } from ".";
import { VjSlotRender } from "../../../utils";

const model = defineModel<VjfInputModel>();
const p = defineProps<VjfInputPropsTotal>();
const attrs = useAttrs();
const props = computed(() => {return Object.assign({}, p, attrs)});

const inputRef = ref<InstanceType<typeof ElInput>>();


const slots = computed(() => {
  return props.value.slots || {};
});

const onChange = (value?: unknown) => {
  props.value.onChange && props.value.onChange(value, props.value, props.value.model!);
};

defineExpose({
  model,  // 值
  props,  // 参数
  inputRef  // el实例ref
});
</script>