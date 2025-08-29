<template>
  <div>
    <el-cascader-panel v-if="props.panel" v-model="model" :options="props.options || []" :props="cascaderProps"
      class="vj-w-full!" @change="onChange" v-bind="props.elCascaderProps || {}" v-on="props.elCascaderEmit || {}">
      <template v-if="props.skDefault && slots[props.skDefault]" #default="scope">
        <component :is="VjSlotRender(slots[props.skDefault]!, scope)" />
      </template>
      <template v-if="props.skEmpty && slots[props.skEmpty]" #empty="scope">
        <component :is="VjSlotRender(slots[props.skEmpty]!, scope)" />
      </template>
    </el-cascader-panel>
    <el-cascader v-else v-model="model" clearable :options="props.options || []" :props="cascaderProps"
      :placeholder="props.placeholder" class="vj-w-full!" @change="onChange" v-bind="props.elCascaderProps || {}"
      v-on="props.elCascaderEmit || {}">
      <template v-if="props.skDefault && slots[props.skDefault]" #default="scope">
        <component :is="VjSlotRender(slots[props.skDefault]!, scope)" />
      </template>
      <template v-if="props.skHeader && slots[props.skHeader]" #header="scope">
        <component :is="VjSlotRender(slots[props.skHeader]!, scope)" />
      </template>
      <template v-if="props.skFooter && slots[props.skFooter]" #footer="scope">
        <component :is="VjSlotRender(slots[props.skFooter]!, scope)" />
      </template>
      <template v-if="props.skEmpty && slots[props.skEmpty]" #empty="scope">
        <component :is="VjSlotRender(slots[props.skEmpty]!, scope)" />
      </template>
      <template v-if="props.skPrefix && slots[props.skPrefix]" #prefix="scope">
        <component :is="VjSlotRender(slots[props.skPrefix]!, scope)" />
      </template>
      <template v-if="props.skSuggestionItem && slots[props.skSuggestionItem]" #suggestion-item="scope">
        <component :is="VjSlotRender(slots[props.skSuggestionItem]!, scope)" />
      </template>
      <template v-if="props.skTag && slots[props.skTag]" #tag="scope">
        <component :is="VjSlotRender(slots[props.skTag]!, scope)" />
      </template>
    </el-cascader>
  </div>
</template>
<script setup lang="ts">
import { ElCascader, ElCascaderPanel } from "element-plus";
import { type ElCascaderLazyLoad, type VjfCascaderModel, type VjfCascaderPropsTotal } from ".";
import { computed } from "vue";
import { VjSlotRender } from "../../../utils";
import type { CascaderProps } from "element-plus/es/components/index.mjs";

const model = defineModel<VjfCascaderModel>();
const props = defineProps<VjfCascaderPropsTotal>();

const slots = computed(() => {
  return props.slots || {};
});

const onChange = (value?: unknown) => {
  props.onChange && props.onChange(value, props, props.model!);
};

const lazyLoad: ElCascaderLazyLoad = (node, resolve) => {
  resolve([]);
};

const cascaderProps = computed<CascaderProps>(() => {
  return Object.assign({
    lazy: props.lazy,
    lazyLoad: (props.lazyLoadFunc ? props.lazyLoadFunc(props, props.model!) : props.lazyLoad) || lazyLoad
  }, props.props || {});
});
</script>