<template>
  <el-date-picker v-model="model" clearable class="vj-w-full!" :disabled="props.disabled"
    :placeholder="props.placeholder" @change="onChange" v-bind="props.elDateProps" v-on="props.elDateEmit || {}" />
</template>
<script lang="ts" setup>
import { ElDatePicker } from "element-plus";
import { type VjfDateModel, type VjfDatePropsTotal } from ".";

const model = defineModel<VjfDateModel>({});
const props = defineProps<VjfDatePropsTotal>();

const onChange = (value?: unknown) => {
  props.onChange && props.onChange(value, props, props.model!);
};
</script>