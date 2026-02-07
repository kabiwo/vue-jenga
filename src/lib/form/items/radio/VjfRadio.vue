<template>
  <div>
    <el-radio-group ref="radioGroupRef" v-model="model" clearable @change="onChange" v-bind="radioProps" v-on="props.elRadioEmit || {}">
      <template v-if="props.button">
        <el-radio-button ref="radioButtonRefs" v-for="item in data" :key="(item.key || item.value as string)" :label="item.label"
          :value="(item.value as string)" v-bind="item.elRadioProps || {}" v-on="item.elRadioEmit || {}">
          <template v-if="props.skOptionDefault && slots[props.skOptionDefault]">
            <component :is="VjSlotRender(slots[props.skOptionDefault]!, item)" />
          </template>
        </el-radio-button>
      </template>
      <template v-else>
        <el-radio ref="radioRefs" v-for="item in data" :key="(item.key || item.value as string)" :label="item.label"
          :value="(item.value as string)" v-bind="item.elRadioProps || {}" v-on="item.elRadioEmit || {}">
          <template v-if="props.skOptionDefault && slots[props.skOptionDefault]">
            <component :is="VjSlotRender(slots[props.skOptionDefault]!, item)" />
          </template>
        </el-radio>
      </template>
    </el-radio-group>
  </div>
</template>
<script lang="ts" setup>
import { ElRadioGroup, ElRadio, ElRadioButton } from "element-plus";
import { computed, ref, useAttrs } from "vue";
import type { VjfRadioModel, VjfRadioPropsTotal } from ".";
import { VjSlotRender } from "../../../utils";

const model = defineModel<VjfRadioModel>();
const p = defineProps<VjfRadioPropsTotal>();
const attrs = useAttrs();
const props = computed(() => {return Object.assign({}, p, attrs)});

const radioGroupRef = ref<InstanceType<typeof ElRadioGroup>>();
const radioButtonRefs = ref<InstanceType<typeof ElRadioButton>[]>();
const radioRefs = ref<InstanceType<typeof ElRadio>[]>();

const data = computed(() => {
  if (typeof props.value.options === "function") {
    return props.value.options(props.value, props.value.model!) || [];
  }
  return props.value.options || [];
});

const radioProps = computed(() => {
  if (typeof props.value.elRadioProps === "function") {
    return props.value.elRadioProps(props.value, props.value.model!) || {};
  }
  return props.value.elRadioProps || {};
});

const slots = computed(() => {
  return props.value.slots || {};
});

const onChange = (value?: unknown) => {
  props.value.onChange && props.value.onChange(value, props.value, props.value.model!);
};

defineExpose({
  model,  // 值
  props,  // 参数
  radioGroupRef,  // el-radio-group实例ref
  radioRefs,  // el-radio实例ref
  radioButtonRefs // el-radio-button实例ref
});
</script>