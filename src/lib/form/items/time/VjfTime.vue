<template>
  <el-time-picker ref="timePickerRef" v-model="model" clearable class="vj-w-full!" :disabled="props.disabled"
    :placeholder="props.placeholder" @change="onChange" v-bind="props.elTimeProps" v-on="props.elTimeEmit || {}" />
</template>
<script lang="ts" setup>
import { ElTimePicker } from "element-plus";
import { type VjfTimeModel, type VjfTimePropsTotal } from ".";
import { ref, useAttrs } from "vue";
import { computed } from "vue";

const model = defineModel<VjfTimeModel>({});
const p = defineProps<VjfTimePropsTotal>();
const attrs = useAttrs();
const props = computed(() => {return Object.assign({}, p, attrs)});

const timePickerRef = ref<InstanceType<typeof ElTimePicker>>();

const onChange = (value?: unknown) => {
  props.value.onChange && props.value.onChange(value, props.value, props.value.model!);
};

defineExpose({
  model, // 值
  props,  // 参数
  timePickerRef // el-time-picker实例ref
});
</script>