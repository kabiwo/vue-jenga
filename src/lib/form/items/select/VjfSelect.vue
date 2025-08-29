<template>
  <div>
    <el-select-v2 v-if="props.virtual" v-model="model" :options="data" :placeholder="props.placeholder" clearable
      filterable :loading="loading" :remote="props.remote" :remote-method="search" @change="onChange"
      v-bind="(selectProps as Partial<ElPropsType<typeof ElSelectV2>>)" v-on="props.elSelectEmit || {}">
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
    </el-select-v2>
    <el-select v-else v-model="model" :placeholder="props.placeholder" clearable filterable :disabled="props.disabled"
      :loading="loading" :remote="props.remote" :remote-method="search" @change="onChange"
      v-bind="(selectProps as ElPropsType<typeof ElSelect>)" v-on="props.elSelectEmit || {}">
      <el-option v-for="item in data" :key="(item.key || item.value as string)" :label="item.label"
        :value="(item.value as string)">
        <template v-if="props.skOptionDefault && slots[props.skOptionDefault]">
          <component :is="VjSlotRender(slots[props.skOptionDefault]!, item)" />
        </template>
      </el-option>
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
    </el-select>
  </div>
</template>
<script lang="ts" setup>
import { ElSelect, ElOption, ElSelectV2 } from 'element-plus';
import type { VjfSelectModel, VjfSelectPropsTotal } from '.';
import { VjSlotRender, type ElPropsType, type VjOptions } from '../../../utils';
import { computed, onMounted, ref, watch } from 'vue';

const model = defineModel<VjfSelectModel>();
const props = defineProps<VjfSelectPropsTotal>();

const data = ref<VjOptions>([]);

const selectProps = computed(() => {
  if (typeof props.elSelectProps === "function") {
    return props.elSelectProps(props, props.model!) || {};
  }
  return props.elSelectProps || {};
});

const slots = computed(() => {
  return props.slots || {};
});

const onChange = (value?: unknown) => {
  let v = value;
  if (props.onChangePrefix) {
    v = props.onChangePrefix(data.value, value, props, props.model!);
  }
  props.onChange && props.onChange(v, props, props.model!);
};

watch(props, () => {
  if (typeof props.options === "function") {
    data.value = props.options(props, props.model!) || [];
  } else {
    data.value = (props.options as VjOptions) || [];
  }
}, {
  immediate: true
})

const paramAttach = computed<Record<string, unknown>>(() => {
  if (!props.remoteParamAttach) {
    return {};
  }
  if (typeof props.remoteParamAttach === "function") {
    return props.remoteParamAttach(props, props.model!);
  }
  return props.remoteParamAttach;
});

const loading = ref<boolean>(false);
const search = async (query: string) => {
  if (!props.remote) {
    return;
  }
  const initOptions = props.remoteInitOptions ? await props.remoteInitOptions(props, props.model) : [];
  if (!props.remoteFunc) {
    data.value = initOptions.filter((item) => item.label.includes(query));
    return;
  }
  loading.value = true;
  let res = await props.remoteFunc({query, ...paramAttach.value}, props, props.model!);
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
  if (props.remoteInitOptions) {
    data.value = await props.remoteInitOptions(props, props.model);
  }
  props.remoteInitQuery && search("");
});
</script>