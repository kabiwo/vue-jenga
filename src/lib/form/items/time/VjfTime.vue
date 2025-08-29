<template>
  <el-time-picker v-model="model" clearable class="vj-w-full!" :disabled="props.disabled"
    :placeholder="props.placeholder" @change="onChange" v-bind="props.elTimeProps" v-on="props.elTimeEmit || {}" />
</template>
<script lang="ts" setup>
import { ElTimePicker } from "element-plus";
import { type VjfTimeModel, type VjfTimePropsTotal } from ".";

const model = defineModel<VjfTimeModel>({});
const props = defineProps<VjfTimePropsTotal>();

const onChange = (value?: unknown) => {
  props.onChange && props.onChange(value, props, props.model!);
};
</script>