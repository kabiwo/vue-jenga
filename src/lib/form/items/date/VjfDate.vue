<template>
  <el-date-picker ref="datePickerRef" v-model="model" clearable class="vj-w-full! vj-box-border" :disabled="props.disabled"
    :placeholder="props.placeholder" @change="onChange" v-bind="props.elDateProps" v-on="props.elDateEmit || {}" />
</template>
<script lang="ts" setup>
import { ElDatePicker } from "element-plus";
import { type VjfDateModel, type VjfDatePropsTotal } from ".";
import { computed, ref, useAttrs } from "vue";

const model = defineModel<VjfDateModel>({});
const p = defineProps<VjfDatePropsTotal>();
const attrs = useAttrs();
const props = computed(() => {return Object.assign({}, p, attrs)});

const datePickerRef = ref<InstanceType<typeof ElDatePicker>>();

const onChange = (value?: unknown) => {
  props.value.onChange && props.value.onChange(value, props.value, props.value.model!);
};

defineExpose({
  model, // 值
  props,  // 参数
  datePickerRef // el-date-picker实例ref
});
</script>