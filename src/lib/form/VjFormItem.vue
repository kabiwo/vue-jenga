<template>
  <el-form-item ref="formItemRef" :label :prop="props.code" class="vj-m-0!" :class="{
      'vj-px-1': props.parentProps.col && props.parentProps.col !== 1,
      'no-label': props.noLabel
    }">
    <template #default="scope">
      <el-row class="vj-w-full">
        <el-col v-if="props.spanPre" :span="props.spanPre">
          <component v-if="props.skPre && slots[props.skPre]"
            :is="VjSlotRender(slots[props.skPre]!, Object.assign({}, scope, scopeAttach))" />
        </el-col>
        <el-col :span="spanItem">
          <template v-if="props.type === 'custom'">
            <component v-if="props.skDefault && slots[props.skDefault as string]"
              :is="VjSlotRender(slots[props.skDefault as string]!, Object.assign({}, scope, scopeAttach))" />
            <div v-else :title="customText" :class="props.className">{{ customText }}</div>
          </template>
          <template v-else-if="props.type === 'number'">
            <VjfNumber ref="typeItemRef" v-model="model" :slots v-bind="mergedProps" @clearValidate="clearValidate" />
          </template>
          <template v-else-if="props.type === 'select'">
            <VjfSelect ref="typeItemRef" v-model="model" :slots v-bind="mergedProps" />
          </template>
          <template v-else-if="props.type === 'sub'">
            <VjfSub ref="typeItemRef" v-model="model" :slots v-bind="mergedProps" />
          </template>
          <template v-else-if="props.type === 'date'">
            <VjfDate ref="typeItemRef" v-model="model" :slots v-bind="mergedProps" />
          </template>
          <template v-else-if="props.type === 'time'">
            <VjfTime ref="typeItemRef" v-model="model" :slots v-bind="mergedProps" />
          </template>
          <template v-else-if="props.type === 'radio'">
            <VjfRadio ref="typeItemRef" v-model="model" :slots v-bind="mergedProps" />
          </template>
          <template v-else-if="props.type === 'checkbox'">
            <VjfCheckbox ref="typeItemRef" v-model="model" :slots v-bind="mergedProps" />
          </template>
          <template v-else-if="props.type === 'switch'">
            <VjfSwitch ref="typeItemRef" v-model="model" :slots v-bind="mergedProps" />
          </template>
          <template v-else-if="props.type === 'upload'">
            <VjfUpload ref="typeItemRef" v-model="model" :slots v-bind="mergedProps" />
          </template>
          <template v-else-if="props.type === 'cascader'">
            <VjfCascader ref="typeItemRef" v-model="model" :slots v-bind="mergedProps" />
          </template>
          <template v-else-if="props.type === 'treeselect'">
            <VjfTreeselect ref="typeItemRef" v-model="model" :slots v-bind="mergedProps" />
          </template>
          <template v-else-if="props.type === 'multi'">
            <VjfMulti ref="typeItemRef" v-model="model" :slots v-bind="mergedProps" />
          </template>
          <template v-else-if="props.type && conf.repoGet(props.type)">
            <component ref="typeItemRef" :is="conf.repoGet(props.type)"
              v-bind="Object.assign({}, mergedProps, props.regProps || {})" v-on="props.regEmit || {}" />
          </template>
          <template v-else>
            <VjfInput ref="typeItemRef" v-model="model" :slots v-bind="mergedProps" />
          </template>
        </el-col>
        <el-col v-if="props.spanPost" :span="props.spanPost">
          <component v-if="props.skPost && slots[props.skPost]"
            :is="VjSlotRender(slots[props.skPost]!, Object.assign({}, scope, scopeAttach))" />
        </el-col>
      </el-row>
    </template>
    <template #label="scope">
      <div v-if="props.noLabel">

      </div>
      <div v-else-if="props.skLabel && slots[props.skLabel]">
        <component
          :is="VjSlotRender(slots[props.skLabel]!, Object.assign({}, scope, scopeAttach))" />
      </div>
      <div v-else>{{ scope.label }}</div>
    </template>
  </el-form-item>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useAttrs, watch, type ComponentPublicInstance, type Ref } from "vue";
import { ElFormItem, ElRow, ElCol } from 'element-plus';
import type { VjfCustomProps, VjFormItemPropsTotal, VjFormItemScopeAttach } from ".";
import { clone, template } from "radash";
import { VjSlotRender } from "../utils";
import VjfInput from "./items/input/VjfInput.vue";
import VjfNumber from "./items/number/VjfNumber.vue";
import VjfSelect from "./items/select/VjfSelect.vue";
import VjfSub from "./items/sub/VjfSub.vue";
import VjfDate from "./items/date/VjfDate.vue";
import VjfTime from "./items/time/VjfTime.vue";
import VjfRadio from "./items/radio/VjfRadio.vue";
import VjfCheckbox from "./items/checkbox/VjfCheckbox.vue";
import VjfSwitch from "./items/switch/VjfSwitch.vue";
import VjfUpload from "./items/upload/VjfUpload.vue";
import VjfCascader from "./items/cascader/VjfCascader.vue";
import VjfTreeselect from "./items/treeselect/VjfTreeselect.vue";
import VjfMulti from "./items/multi/VjfMulti.vue";
import { useVjConfStore } from "../utils";

const conf = useVjConfStore();

const getProps = (p: unknown) => {
  console.log('item', p);
}

const model = defineModel<unknown>();
const p = defineProps<VjFormItemPropsTotal>();
const attrs = useAttrs();
const props = computed(() => { return Object.assign({}, p, attrs) });
watch(props, () => {
  if (model.value === undefined && props.value.defaultValue !== undefined) {
    let def;
    if (typeof props.value.defaultValue === "function") {
      def = props.value.defaultValue(props.value, props.value.model);
    } else {
      def = props.value.defaultValue;
    }
    nextTick(() => {
      model.value = def;
    });
  }
}, {
  immediate: true,
});

const scopeAttach = computed<VjFormItemScopeAttach>(() => {
  return {
    _FormModel: props.value.model,
    _ItemProps: props.value,
    _code: props.value.code,
    _index: props.value.index,
    _forms: props.value.forms
  };
});

const formItemRef = ref<InstanceType<typeof ElFormItem>>();
const typeItemRef = ref<ComponentPublicInstance>();

const slots = computed(() => {
  return props.value.slots || {};
});

const label = computed(() => {
  return props.value.labelMap[props.value.code];
});

const mergedProps = computed(() => {
  let obj: VjFormItemPropsTotal = clone(props.value);
  if (!props.value.placeholder && !props.value.noPlaceholder) {
    let type: string = props.value.type as string;
    if (type && ["select", "treeselect", "datetime", "cascader-lazy"].includes(type)) {
      obj.placeholder = template(`请选择{{0}}`, [label.value])
    } else if (type && ["number"].includes(type)) {
      obj.placeholder = '请输入';
    } else if (type && ["select-remote", "treeselect-remote"].includes(type)) {
      obj.placeholder = template(`输入关键字筛选{{0}}`, [label.value]);
    } else {
      obj.placeholder = template(`请输入{{0}}`, [label.value]);
    }
  }
  if (props.value.disableCheck) {
    if (typeof props.value.disableCheck === "function") {
      obj.disabled = props.value.disableCheck(props.value, props.value.model!);
    } else {
      obj.disabled = props.value.disableCheck;
    }
  }
  return obj;
});

const spanItem = computed(() => {
  return 24 - (props.value.spanPre || 0) - (props.value.spanPost || 0);
});

onMounted(() => { });

const clearValidate = () => {
  formItemRef.value?.clearValidate();
};

const customText = computed(() => {
  let text = props.value.formatter ? (props.value as VjfCustomProps).formatter!(model.value, mergedProps.value, mergedProps.value.model!) : model.value || "-";
  return text as string;
});

defineExpose({
  formItemRef, // el-form-item的ref
  typeItemRef,  // 具体子组件的ref
  clearValidate,  // 清除验证
  mergedProps // 合并后的props
});
</script>
<style scoped>
.no-label :deep(.el-form-item__label) {
  padding-right: 0;
}
</style>