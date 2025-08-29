<template>
  <el-form-item ref="formItemRef" :label :prop="props.code" class="vj-px-1 vj-m-0!">
    <template #default="scope">
      <el-row class="vj-w-full">
        <el-col v-if="props.spanPre" :span="props.spanPre">
          <component v-if="props.skPre && slots[props.skPre]"
            :is="VjSlotRender(slots[props.skPre]!, Object.assign({}, scope, { _FormModel: props.model }))" />
        </el-col>
        <el-col :span="spanItem">
          <template v-if="props.type === 'custom'">
            <component v-if="props.skDefault && slots[props.skDefault as string]"
              :is="VjSlotRender(slots[props.skDefault as string]!, Object.assign({}, scope, { _FormModel: props.model, _ItemProps: props, _code: props.code }))" />
            <div v-else :title="customText" :class="props.className">{{ customText }}</div>
          </template>
          <template v-else-if="props.type === 'number'">
            <VjfNumber v-model="model" :slots v-bind="mergedProps" @clearValidate="clearValidate" />
          </template>
          <template v-else-if="props.type === 'select'">
            <VjfSelect v-model="model" :slots v-bind="mergedProps" />
          </template>
          <template v-else-if="props.type === 'sub'">
            <VjfSub v-model="model" :slots v-bind="mergedProps" />
          </template>
          <template v-else-if="props.type === 'date'">
            <VjfDate v-model="model" :slots v-bind="mergedProps"/>
          </template>
          <template v-else-if="props.type === 'time'">
            <VjfTime v-model="model" :slots v-bind="mergedProps"/>
          </template>
          <template v-else-if="props.type === 'radio'">
            <VjfRadio v-model="model" :slots v-bind="mergedProps"/>
          </template>
          <template v-else-if="props.type === 'checkbox'">
            <VjfCheckbox v-model="model" :slots v-bind="mergedProps"/>
          </template>
          <template v-else-if="props.type === 'switch'">
            <VjfSwitch v-model="model" :slots v-bind="mergedProps"/>
          </template>
          <template v-else-if="props.type === 'upload'">
            <VjfUpload v-model="model" :slots v-bind="mergedProps"/> 
          </template>
          <template v-else-if="props.type === 'cascader'">
            <VjfCascader v-model="model" :slots v-bind="mergedProps"/>
          </template>
          <template v-else-if="props.type === 'treeselect'">
            <VjfTreeselect v-model="model" :slots v-bind="mergedProps"/>
          </template>
          <template v-else>
            <VjfInput v-model="model" :slots v-bind="mergedProps" />
          </template>
        </el-col>
        <el-col v-if="props.spanPost" :span="props.spanPost">
          <component v-if="props.skPost && slots[props.skPost]"
            :is="VjSlotRender(slots[props.skPost]!, Object.assign({}, scope, { _FormModel: props.model }))" />
        </el-col>
      </el-row>
    </template>
  </el-form-item>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { ElFormItem, ElRow, ElCol } from 'element-plus';
import type { VjfCustomProps, VjFormItemPropsTotal } from ".";
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

const getProps = (p: unknown) => {
  console.log('item', p);
}

const model = defineModel<unknown>();
const props = defineProps<VjFormItemPropsTotal>();
watch(props, () => {
  if (model.value === undefined && props.defaultValue !== undefined) {
    let def;
    if (typeof props.defaultValue === "function") {
      def = props.defaultValue(props, props.model);
    } else {
      def = props.defaultValue;
    }
    nextTick(() => {
      model.value = def;
    });
  }
}, {
  immediate: true,
});

const formItemRef = ref();

const slots = computed(() => {
  return props.slots || {};
});

const label = computed(() => {
  return props.labelMap[props.code];
});

const mergedProps = computed(() => {
  let obj: VjFormItemPropsTotal = clone(props);
  if (!props.placeholder && !props.noPlaceholder) {
    let type: string = props.type as string;
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
  if (props.disableCheck) {
    if (typeof props.disableCheck === "function") {
      obj.disabled = props.disableCheck(props, props.model!);
    } else {
      obj.disabled = props.disableCheck;
    }
  }
  return obj;
});

const spanItem = computed(() => {
  return 24 - (props.spanPre || 0) - (props.spanPost || 0);
});

onMounted(() => { });

const clearValidate = () => {
  formItemRef.value?.clearValidate();
};

const customText = computed(() => {
  let text = props.formatter ? (props as VjfCustomProps).formatter!(model.value, mergedProps.value, mergedProps.value.model!) : model.value || "-";
  return text as string;
});
</script>