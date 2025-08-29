<template>
  <div>
    <el-radio-group v-model="model" clearable @change="onChange" v-bind="radioProps" v-on="props.elRadioEmit || {}">
      <template v-if="props.button">
        <el-radio-button v-for="item in data" :key="(item.key || item.value as string)" :label="item.label"
          :value="(item.value as string)" v-bind="item.elRadioProps || {}" v-on="item.elRadioEmit || {}">
          <template v-if="props.skOptionDefault && slots[props.skOptionDefault]">
            <component :is="VjSlotRender(slots[props.skOptionDefault]!, item)" />
          </template>
        </el-radio-button>
      </template>
      <template v-else>
        <el-radio v-for="item in data" :key="(item.key || item.value as string)" :label="item.label"
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
import { computed } from "vue";
import type { VjfRadioModel, VjfRadioPropsTotal } from ".";
import { VjSlotRender } from "../../../utils";

const model = defineModel<VjfRadioModel>();
const props = defineProps<VjfRadioPropsTotal>();

const data = computed(() => {
  if (typeof props.options === "function") {
    return props.options(props, props.model!) || [];
  }
  return props.options || [];
});

const radioProps = computed(() => {
  if (typeof props.elRadioProps === "function") {
    return props.elRadioProps(props, props.model!) || {};
  }
  return props.elRadioProps || {};
});

const slots = computed(() => {
  return props.slots || {};
});

const onChange = (value?: unknown) => {
  props.onChange && props.onChange(value, props, props.model!);
};
</script>