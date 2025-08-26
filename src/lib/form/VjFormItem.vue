<template>
  <el-form-item ref="formItemRef" :label :prop="props.code" class="px-1 m-0!">
    <template #default="scope">
      <el-row class="w-full">
        <el-col v-if="props.spanPre" :span="props.spanPre">
          <component v-if="props.skPre && slots[props.skPre]" :is="getComponent(slots[props.skPre]!, Object.assign({}, scope, { _FormModel: props.model }))" />
        </el-col>
        <el-col :span="spanItem">

        </el-col>
        <el-col v-if="props.spanPost" :span="props.spanPost">
          <component v-if="props.skPost && slots[props.skPost]" :is="getComponent(slots[props.skPost]!, Object.assign({}, scope, { _FormModel: props.model }))" />
        </el-col>
      </el-row>
    </template>
  </el-form-item>
</template>
<script setup lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, watch, type Slot, } from "vue";
import type { ItemCustomProps, VjFormItemPropsTotal } from ".";
import { clone, template } from "radash";

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

const getComponent = (slot: Slot, scope: unknown) => {
  return defineComponent(() => () => slot(scope));
};

const spanItem = computed(() => {
  return 24 - (props.spanPre || 0) - (props.spanPost || 0);
});

onMounted(() => { });

const clearValidate = () => {
  formItemRef.value?.clearValidate();
};

const computedCustomText = computed(() => {
  let text = ((props as ItemCustomProps).formatter ? (props as ItemCustomProps).formatter!(model.value, mergedProps.value, mergedProps.value.model!) : model.value || "-") as string;
  return text;
});
</script>