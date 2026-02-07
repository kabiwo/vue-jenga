<template>
  <VjForm ref="formRef" v-model="subModel" :rootModel="props.rootModel" :slots :elFormProps="pr" v-bind="formConf">
    <template #multicontrol="scope">
      <div class="vj-flex vj-h-full vj-justify-start vj-gap-0.5 vj-flex-items-center vj-pl-1">
        <el-button circle size="small" type="success" @click="add(scope._index)">
          <el-icon class="i-ep-plus vj-font-size-1.6" />
        </el-button>
        <el-button circle size="small" type="danger" @click="del(scope._index)" v-if="(formConf.form || []).length > 1" class="m-0!">
          <el-icon class="i-ep-delete vj-font-size-1.6" />
        </el-button>
      </div>
    </template>
  </VjForm>
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, useAttrs, watch } from "vue";
import { ref } from "vue";
import VjForm from "../../VjForm.vue";
import type { VjfMultiModel, VjfMultiPropsTotal } from ".";
import type { ElFormInsType, VjFormItemProps, VjFormProps } from "../..";
import { clone, isEqual } from "radash";
import {ElButton, ElIcon} from 'element-plus';

const model = defineModel<VjfMultiModel>({
  default: [undefined],
});
const p = defineProps<VjfMultiPropsTotal>();
const attrs = useAttrs();
const props = computed(() => {return Object.assign({}, p, attrs)});

const subModel = ref<Record<string, unknown>>({});

const slots = computed(() => {
  return props.value.slots || {};
});

const formRef = ref<ElFormInsType>();

const config = computed<VjFormItemProps>(() => {
  let c: VjFormItemProps;
  if (typeof props.value.multiItemConf === "function") {
    c = props.value.multiItemConf(props.value, model.value);
  } else {
    c = props.value.multiItemConf;
  }
  c.skPost = 'multicontrol';
  c.spanPost = props.value.multiSpan || 5;
  return c;
});

const formConf = computed<VjFormProps>(() => {
  let forms = model.value.map((v, i) => {
    return Object.assign(clone(config.value), {
      label: `${config.value.label}${config.value.label?'-':''}${i}`,
      code: `${config.value.code}-${i}`
    });
  });
  return {
    form: forms
  };
});

const pr = ref<VjFormProps["elFormProps"]>({
  inline: true,
  hideRequiredAsterisk: true,
  labelWidth: 0,
});

onMounted(() => {
  props.value.addSubForm(props.value.code, formRef.value!);
});
onUnmounted(() => {
  props.value.rmSubForm(props.value.code);
});

watch(model, (v) => {
  let obj: Record<string, unknown> = {};
  v.forEach((item, index) => {
    obj[`${config.value.code}-${index}`] = item;
  });
  if (isEqual(obj, subModel.value)) {
    return;
  }
  subModel.value = obj;
}, {
  deep: true,
  immediate: true // 回显触发
});
watch(subModel, (v) => {
  let keys = Object.keys(v);
  model.value = keys.sort().map(i => v[i]);
}, {
  deep: true,
});

const add = (index: number, attach?: unknown) => { //attach为onLengthChange的附加参数
  if (props.value.onLengthChange) {
    if (!props.value.onLengthChange(index, 'add', {props: props.value, model}, attach)) {
      return;
    }
  }
  model.value.splice(index + 1, 0, props.value.multiItemDefaultValue?props.value.multiItemDefaultValue(): undefined);
  model.value = [...model.value];
};

const del = (index: number, attach?: unknown) => { //attach为onLengthChange的附加参数
  if (props.value.onLengthChange) {
    if (!props.value.onLengthChange(index, 'del', {props: props.value, model}, attach)) {
      return;
    }
  }
  model.value.splice(index, 1);
  model.value = [...model.value];
};

defineExpose({
  model,  // 值
  props,  // 参数
  formRef,  // 子vjForm的实例ref
  add,  // 增加一条
  del // 删除一条
});
</script>