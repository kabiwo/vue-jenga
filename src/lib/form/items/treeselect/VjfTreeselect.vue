<template>
  <div>
    <el-tree-select ref="treeSelectRef" v-model="model" :data="data" :placeholder="props.placeholder" clearable filterable check-strictly :disabled="props.disabled"
      :loading="loading" :remote="props.remote" :remote-method="search" @change="onChange"
      v-bind="(selectProps as ElPropsType<typeof ElTreeSelect>)" v-on="props.elSelectEmit || {}">
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
      <template v-if="props.skLoading && slots[props.skLoading]" #loading="scope">
        <component :is="VjSlotRender(slots[props.skLoading]!, scope)" />
      </template>
      <template v-if="props.skLabel && slots[props.skLabel]" #label="scope">
        <component :is="VjSlotRender(slots[props.skLabel]!, scope)" />
      </template>
      <template v-if="props.skTag && slots[props.skTag]" #tag="scope">
        <component :is="VjSlotRender(slots[props.skTag]!, scope)" />
      </template>
    </el-tree-select>
  </div>
</template>
<script lang="ts" setup>
import { ElTreeSelect } from 'element-plus';
import type { VjfTreeSelectModel, VjfTreeSelectPropsTotal } from '.';
import { VjSlotRender, type ElPropsType, type VjOptions } from '../../../utils';
import { computed, onMounted, ref, useAttrs, watch } from 'vue';

const model = defineModel<VjfTreeSelectModel>();
const p = defineProps<VjfTreeSelectPropsTotal>();
const attrs = useAttrs();
const props = computed(() => {return Object.assign({}, p, attrs)});

const treeSelectRef = ref<InstanceType<typeof ElTreeSelect>>();

const data = ref<VjOptions>([]);

const selectProps = computed(() => {
  if (typeof props.value.elSelectProps === "function") {
    return props.value.elSelectProps(props.value, props.value.model!) || {};
  }
  return props.value.elSelectProps || {};
});

const slots = computed(() => {
  return props.value.slots || {};
});

const onChange = (value?: unknown) => {
  let v = value;
  if (props.value.onChangePrefix) {
    v = props.value.onChangePrefix(data.value, value, props.value, props.value.model!);
  }
  props.value.onChange && props.value.onChange(v, props.value, props.value.model!);
};

const optionsCompted = computed(() => {
  if (typeof props.value.options === "function") {
    return props.value.options(props.value, props.value.model!) || [];
  } else {
    return (props.value.options as VjOptions) || [];
  }
});

watch(optionsCompted, () => {
  data.value = optionsCompted.value;
}, {
  immediate: true
});

const paramAttach = computed<Record<string, unknown>>(() => {
  if (!props.value.remoteParamAttach) {
    return {};
  }
  if (typeof props.value.remoteParamAttach === "function") {
    return props.value.remoteParamAttach(props.value, props.value.model!);
  }
  return props.value.remoteParamAttach;
});

const loading = ref<boolean>(false);
const search = async (query: string) => {
  if (!props.value.remote) {
    return;
  }
  const initOptions = props.value.remoteInitOptions ? await props.value.remoteInitOptions(props.value, props.value.model) : [];
  if (!props.value.remoteFunc) {
    data.value = initOptions.filter((item) => item.label.includes(query));
    return;
  }
  loading.value = true;
  let res = await props.value.remoteFunc({query, ...paramAttach.value}, props.value, props.value.model!);
  loading.value = false;
  if (res) {
    if (!query) {
      let t = initOptions.filter(v => !res.find(r => r.value === v.value));
      res = res.concat(t);
    }
    data.value = res;
  } else {
    data.value = [];
  }
};

onMounted(async () => {
  if (props.value.remoteInitOptions) {
    data.value = await props.value.remoteInitOptions(props.value, props.value.model);
  }
  props.value.remoteInitQuery && search("");
});

defineExpose({
  model,  // 值
  props,  // 参数
  treeSelectRef, // el-tree-select实例ref
  search  // 可以触发一次远程搜索 
});
</script>