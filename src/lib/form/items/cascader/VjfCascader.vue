<template>
  <div>
    <el-cascader-panel ref="cascaderPanelRef" v-if="props.panel" v-model="model" :options="props.options || []" :props="cascaderProps"
      class="vj-w-full!" @change="onChange" v-bind="props.elCascaderProps || {}" v-on="props.elCascaderEmit || {}">
      <template v-if="props.skDefault && slots[props.skDefault]" #default="scope">
        <component :is="VjSlotRender(slots[props.skDefault]!, scope)" />
      </template>
      <template v-if="props.skEmpty && slots[props.skEmpty]" #empty="scope">
        <component :is="VjSlotRender(slots[props.skEmpty]!, scope)" />
      </template>
    </el-cascader-panel>
    <el-cascader ref="cascaderRef" v-else v-model="model" clearable :options="props.options || []" :props="cascaderProps"
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
import { computed, onMounted, ref, useAttrs, type ComponentPublicInstance, type Ref } from "vue";
import { VjSlotRender } from "../../../utils";
import type { CascaderProps } from "element-plus/es/components/index.mjs";

const model = defineModel<VjfCascaderModel>();
const p = defineProps<VjfCascaderPropsTotal>();
const attrs = useAttrs();
const props = computed(() => {return Object.assign({}, p, attrs)});

const cascaderRef = ref<InstanceType<typeof ElCascader>>();
const cascaderPanelRef = ref<InstanceType<typeof ElCascaderPanel>>();


const slots = computed(() => {
  return props.value.slots || {};
});

const onChange = (value?: unknown) => {
  props.value.onChange && props.value.onChange(value, props.value, props.value.model!);
};

const lazyLoad: ElCascaderLazyLoad = (node, resolve) => {
  resolve([]);
};

const cascaderProps = computed<CascaderProps>(() => {
  return Object.assign({
    lazy: props.value.lazy,
    lazyLoad: (props.value.lazyLoadFunc ? props.value.lazyLoadFunc(props.value, props.value.model!) : props.value.lazyLoad) || lazyLoad
  }, props.value.props || {});
});

defineExpose({
  model,  // 绑定值
  props,  // 参数
  cascaderRef,  // el-cascader实例ref
  cascaderPanelRef   // el-cascader-panel实例ref
});
</script>