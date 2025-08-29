<template>
  <div>
    <el-switch v-model="model" @change="onChange" v-bind="props.elSwitchProps" v-on="props.elSwitchEmit || {}">
      <template v-if="props.skActiveAction && slots[props.skActiveAction]" #active-action>
        <component :is="VjSlotRender(slots[props.skActiveAction]!, { props, model })" />
      </template>
      <template v-if="props.skInactiveAction && slots[props.skInactiveAction]" #inactive-action>
        <component :is="VjSlotRender(slots[props.skInactiveAction]!, { props, model })" />
      </template>
    </el-switch>
  </div>
</template>
<script lang="ts" setup>
import { type VjfSwitchModel, type VjfSwitchPropsTotal } from ".";
import { ElSwitch } from "element-plus";
import { VjSlotRender } from "../../../utils";
import { computed } from "vue";

const model = defineModel<VjfSwitchModel>();
const props = defineProps<VjfSwitchPropsTotal>();

const slots = computed(() => {
  return props.slots || {};
});

const onChange = (value?: unknown) => {
  props.onChange && props.onChange(value, props, props.model!);
};
</script>