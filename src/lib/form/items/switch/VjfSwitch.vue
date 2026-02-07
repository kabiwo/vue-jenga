<template>
  <div>
    <el-switch ref="switchRef" v-model="model" @change="onChange" v-bind="props.elSwitchProps" v-on="props.elSwitchEmit || {}">
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
import { computed, ref, useAttrs } from "vue";

const model = defineModel<VjfSwitchModel>();
const p = defineProps<VjfSwitchPropsTotal>();
const attrs = useAttrs();
const props = computed(() => {return Object.assign({}, p, attrs)});

const switchRef = ref<InstanceType<typeof ElSwitch>>();

const slots = computed(() => {
  return props.value.slots || {};
});

const onChange = (value?: unknown) => {
  props.value.onChange && props.value.onChange(value, props.value, props.value.model!);
};

defineExpose({
  model,
  props,
  switchRef
});
</script>