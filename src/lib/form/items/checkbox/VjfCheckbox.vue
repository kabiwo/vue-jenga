<template>
  <div>
    <el-checkbox-group v-model="model" clearable @change="onChange" v-bind="CheckboxProps" v-on="props.elCheckboxEmit || {}">
      <template v-if="props.button">
        <el-checkbox-button v-for="item in data" :key="(item.key || item.value as string)" :label="item.label"
          :value="(item.value as string)" v-bind="item.elCheckboxProps || {}" v-on="item.elCheckboxEmit || {}">
          <template v-if="props.skOptionDefault && slots[props.skOptionDefault]">
            <component :is="VjSlotRender(slots[props.skOptionDefault]!, item)" />
          </template>
        </el-checkbox-button>
      </template>
      <template v-else>
        <el-checkbox v-for="item in data" :key="(item.key || item.value as string)" :label="item.label"
          :value="(item.value as string)" v-bind="item.elCheckboxProps || {}" v-on="item.elCheckboxEmit || {}">
          <template v-if="props.skOptionDefault && slots[props.skOptionDefault]">
            <component :is="VjSlotRender(slots[props.skOptionDefault]!, item)" />
          </template>
          <template v-else>
            {{ item.label }}
          </template>
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </div>
</template>
<script lang="ts" setup>
import { ElCheckboxGroup, ElCheckbox, ElCheckboxButton } from "element-plus";
import { computed } from "vue";
import type { VjfCheckboxModel, VjfCheckboxPropsTotal } from ".";
import { VjSlotRender } from "../../../utils";

const model = defineModel<VjfCheckboxModel>();
const props = defineProps<VjfCheckboxPropsTotal>();

const data = computed(() => {
  if (typeof props.options === "function") {
    return props.options(props, props.model!) || [];
  }
  return props.options || [];
});

const CheckboxProps = computed(() => {
  if (typeof props.elCheckboxProps === "function") {
    return props.elCheckboxProps(props, props.model!) || {};
  }
  return props.elCheckboxProps || {};
});

const slots = computed(() => {
  return props.slots || {};
});

const onChange = (value?: unknown) => {
  props.onChange && props.onChange(value, props, props.model!);
};
</script>