<template>
  <el-form ref="formRef" label-width="auto" label-suffix="：" :model :rules :validate-on-rule-change="false"
    class="vj-form vj-w-full" v-loading="props.loading" v-bind="props.elFormProps">
    <div class="vj-grid vj-w-full vj-pb-2 vj-gap-1.6" :class="[]" :style="{
      gridTemplateColumns: `repeat(${props.col || 1}, 1fr)`
    }">
      <div v-for="item in forms" :key="item.code" :style="{
        gridColumn: `span ${item.colspan || 1}`,
        gridRow: `span ${item.rowspan || 1}`
      }">
        <VjFormItem v-if="!(item.type && item.type === 'empty')" :slots v-model="model[item.code]" :model :rootModel="props.rootModel || model" :addItemRule
          :rmItemRule :addSubForm :rmSubForm :labelMap v-bind="item">
        </VjFormItem>
      </div>
    </div>
  </el-form>
</template>
<script setup lang="ts">
import { computed, nextTick, ref, useSlots, watch, type Slots } from 'vue';
import type { ElFormInsType, VjfRepeatProps, VjFormItemProps, VjFormPropsTotal } from '.';
import { assign, mapKeys, objectify, tryit } from 'radash';
import { ElForm, ElLoading, type FormItemProp, type FormRules } from 'element-plus';
import { getRule } from './rule';
import VjFormItem from './VjFormItem.vue';

const vLoading = ElLoading.directive;

const model = defineModel<Record<string, unknown>>({
  default: {},
});

const props = defineProps<VjFormPropsTotal>();

const s: Slots = useSlots();
const slots = computed<Slots>(() => {
  return assign(mapKeys(s, key => key), props.slots || {});
});

const forms = computed(() => {
  let arr: VjFormItemProps[] = [];
  (props.form || []).forEach((item) => {
    let hide = typeof item.hide === "function" ? item.hide(item, model.value) : item.hide;
    if (!hide) {
      let it = item as VjfRepeatProps;
      if (it.type === "repeat") {
        arr = arr.concat((typeof it.repeatItems === "function" ? it.repeatItems(it, model.value) : it.forItems) as VjFormItemProps[]);
      } else {
        arr.push(item);
      }
    }
  });
  if (props.remerge) {
    arr = arr.map((item, index) => {
      return assign(item, props.remerge!(item, index)) as VjFormItemProps;
    })
  }
  return arr
});
watch(forms, () => {
  nextTick(() => {
    formRef.value?.clearValidate();
  });
});

const formRef = ref<ElFormInsType>();

const labelMap = computed(() => {
  return objectify(props.form || [], item => item.code, item => (typeof item.label === "function" ? item.label(item) : item.label) || '');
});

const ruleCollect = ref<FormRules>({});

const addItemRule = (key: string, rule: VjFormItemProps) => {
  ruleCollect.value[key] = getRule(rule, labelMap, model);
  return ruleCollect.value;
};
const rmItemRule = (key: string) => {
  delete ruleCollect.value[key];
  return ruleCollect.value;
};

const rules = computed<FormRules>(() => {
  // let obj: FormRules = {};
  // forms.value.forEach((v) => {
  //   obj[v.code] = getRule(v, labelMap, model);
  // });
  // return Object.assign(obj, ruleCollect.value);
  return assign(objectify(forms.value, item => item.code, item => getRule(item, labelMap, model)), ruleCollect.value);
});

const subFormCollect = ref<Record<string, ElFormInsType>>({});

const addSubForm = (key: string, form: ElFormInsType) => {
  subFormCollect.value[key] = form;
  return subFormCollect.value;
};
const rmSubForm = (key: string) => {
  delete subFormCollect.value[key];
  return subFormCollect.value;
};

const validate = async (): Promise<[boolean, Error | undefined]> => {
  let [warn, status] = await tryit(() => Promise.all([formRef.value!.validate(), ...Object.values(subFormCollect.value).map((v) => v.validate())]))();
  return [!(warn || !status || status.includes(false)), warn];
};

const reset = (props?: FormItemProp | FormItemProp[]) => {
  formRef.value!.resetFields(props);
  Object.values(subFormCollect.value).forEach((v) => v?.resetFields(props));
};

defineExpose({
  forms,
  validate,
  reset,
  formRef,
  labelMap
});
</script>