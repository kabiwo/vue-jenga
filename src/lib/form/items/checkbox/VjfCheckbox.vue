<template>
  <div>
    <el-checkbox ref="checkAllRef" v-if="props.allControl" v-model="checkAllFlag" :indeterminate="isIndeterminate" @change="handleCheckAllChange">{{ props.allText || '全选' }}</el-checkbox>
    <el-checkbox-group ref="checkboxGroupRef" v-model="model" clearable @change="onChange" v-bind="CheckboxProps"
      v-on="props.elCheckboxEmit || {}">
      <template v-if="props.button">
        <el-checkbox-button ref="checkboxButtonRefs" v-for="item in data" :key="(item.key || item.value as string)"
          :label="item.label" :value="(item.value as string)" v-bind="item.elCheckboxProps || {}"
          v-on="item.elCheckboxEmit || {}">
          <template v-if="props.skOptionDefault && slots[props.skOptionDefault]">
            <component :is="VjSlotRender(slots[props.skOptionDefault]!, item)" />
          </template>
        </el-checkbox-button>
      </template>
      <template v-else>
        <el-checkbox ref="checkboxRefs" v-for="item in data" :key="(item.key || item.value as string)"
          :label="item.label" :value="(item.value as string)" v-bind="item.elCheckboxProps || {}"
          v-on="item.elCheckboxEmit || {}">
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
import { ElCheckboxGroup, ElCheckbox, ElCheckboxButton, type CheckboxValueType } from "element-plus";
import { computed, onMounted, ref, useAttrs, watch } from "vue";
import type { VjfCheckboxModel, VjfCheckboxPropsTotal } from ".";
import { VjSlotRender } from "../../../utils";

const model = defineModel<VjfCheckboxModel>();
const p = defineProps<VjfCheckboxPropsTotal>();
const attrs = useAttrs();
const props = computed(() => {return Object.assign({}, p, attrs)});

const checkboxGroupRef = ref<InstanceType<typeof ElCheckboxGroup>>();
const checkboxButtonRefs = ref<InstanceType<typeof ElCheckboxButton>[]>();
const checkboxRefs = ref<InstanceType<typeof ElCheckbox>[]>();
const checkAllRef = ref<InstanceType<typeof ElCheckbox>>();

const checkAllFlag = ref(false);
const isIndeterminate = ref(true);

const data = computed(() => {
  if (typeof props.value.options === "function") {
    return props.value.options(props.value, props.value.model!) || [];
  }
  return props.value.options || [];
});

const CheckboxProps = computed(() => {
  if (typeof props.value.elCheckboxProps === "function") {
    return props.value.elCheckboxProps(props.value, props.value.model!) || {};
  }
  return props.value.elCheckboxProps || {};
});

const slots = computed(() => {
  return props.value.slots || {};
});

const onChange = (value?: unknown) => {
  props.value.onChange && props.value.onChange(value, props.value, props.value.model!);
};

watch({
  model,
  data
}, (val) => {
  let m = val?.model.value;
  let d = val?.data.value;
  if (m && m.length && d && d.length) {
    if (m.length >= d.length) {
      checkAllFlag.value = true;
      isIndeterminate.value = false;
    } else {
      checkAllFlag.value = false;
      isIndeterminate.value = true;
    }
  } else {
    checkAllFlag.value = false;
    isIndeterminate.value = false;
  }
}, {
  immediate: true,
  deep: true
});

const handleCheckAllChange = (val: CheckboxValueType) => {
  model.value = val ? data.value.map(v => v.value as string) : []
};

onMounted(() => {

});

const allControler = (check?: boolean) => {
  model.value = check? data.value.map(v => v.value as string): [];
};

defineExpose({
  model,  // 值
  props,  // 参数
  checkboxGroupRef, // el-checkbox-group实例ref
  checkboxRefs, // el-checkbox实例ref
  checkboxButtonRefs, // el-checkbox-button实例ref
  checkAllRef,  // 作为checkall的el-checkbox的实例ref

  allControler  // 批量设置选中状态
});
</script>