<template>
  <div>
  <VjModal ref="modalRef" v-bind="mergeProps">
    <component v-if="props.skPre && slots[props.skPre]" :is="VjSlotRender(slots[props.skPre]!)" />
    <VjForm ref="formRef" v-model="formValue" v-bind="props.formProps || {}" :slots></VjForm>
    <component v-if="props.skPost && slots[props.skPost]" :is="VjSlotRender(slots[props.skPost]!)" />
  </VjModal>
  </div>
</template>
<script setup lang="ts">
import { type VjModalFormProps } from ".";
import { ref, useSlots, computed, type Slots } from "vue";
import VjModal from "./VjModal.vue";
import { assign, mapKeys, tryit } from "radash";
import VjForm from "../form/VjForm.vue";
import { VjSlotRender } from "../utils";

const props = defineProps<VjModalFormProps>();

const emit = defineEmits<{
  cancel: [];
  confirm: [value: Record<string, unknown>];
  closed: [];
}>();

const s: Slots = useSlots();
const slots = computed<Slots>(() => {
  return assign(mapKeys(s, key => key), props.slots || {});
});

const formRef = ref<InstanceType<typeof VjForm>>();
const modalRef = ref<InstanceType<typeof VjModal>>();

const saveLoading = ref(false);

const formValue = ref<Record<string, unknown>>({});

const mergeProps = computed(() => {
  let obj: Record<string, unknown> = {};
  obj.confirmCheckFunc = async () => {
    let checkRes = await formRef.value!.validate();
    if (!checkRes[0]) {
      console.log(checkRes)
      return false;
    }
    if (props.confirmCheckFunc) {
      let [err, res] = await tryit(() => props.confirmCheckFunc!(formValue.value))();
      if (!res) {
        console.log(err);
        return false;
      }
    }
    return true;
  };
  obj.confirmFunc = async () => {
    if (props.confirmFunc) {
      let [err, res] = await tryit(() => props.confirmFunc!(formValue.value))();
      if (!res) {
        console.log(err);
        return false;
      }
    }
    return true;
  };
  Object.entries(props).forEach(([key, value], index) => {
    if (!['formProps', 'confirmFunc', 'confirmCheckFunc'].includes(key)) {
      obj[key] = value;
    }
  })

  return obj as VjModalFormProps;
});

const setData = (data: Record<string, unknown>, merge?: boolean) => {
  if (merge) {
    formValue.value = Object.assign({}, formValue.value, data);
  } else {
    formValue.value = data;
  }
};

const getData = () => {
  return formValue.value;
};

const show = (data?: Record<string, unknown>) => {
  if (data) {
    formValue.value = data;
  } else {
    formValue.value = {};
  }
  setTimeout(() => {
    modalRef.value?.show(data);
  });
};

const validate = async () => {
  return formRef.value!.validate();
};

defineExpose({
  form: formRef,  // VjForm实例
  modal: modalRef,  // VjModal实例
  show, // 显示函数
  setData,  // 设置表单数据
  getData,  // 获取表单数据
  validate, // 触发表单验证
});
</script>