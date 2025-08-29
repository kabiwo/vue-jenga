<template>
  <slot
    @click="
      modalShow = true;
      emit('open');
    "
  ></slot>
  <CommonDialog
    ref="dialogRef"
    v-model="modalShow"
    :title="props.title || ''"
    :loading="saveLoading"
    :noFooter="props.noFooter"
    v-bind="props.DialogProps"
    :width="props.width || '15rem'"
    @ok="ok"
    @closed="emit('closed')"
    @cancle="emit('cancel')"
  >
    <AutoForm
      ref="formRef"
      v-model="formValue"
      :form="props.form"
      :num="props.num || 1"
      :slots
      v-bind="props.formProps || {}"
    >
    </AutoForm>
    <slot name="post"></slot>
  </CommonDialog>
</template>
<script setup lang="ts">
import CommonDialog from "../common-dialog";
import { DialogFormProps } from ".";
import { ref, useSlots, computed, Slots } from "vue";
import AutoForm from "../auto-form";
import AWAIT from "@/common/utils/await";

const props = defineProps<DialogFormProps>();

const emit = defineEmits<{
  open: [];
  cancel: [];
  ok: [value: Record<string, unknown>];
  closed: [];
}>();

const s: Slots = useSlots();
const slots = computed<Slots>(() => {
  let keys = Object.keys(s);
  let obj: Record<string | number, Slots[keyof Slots]> = {}; // vite dose not export Slot here
  keys.forEach((key) => {
    obj[key] = s[key]!;
  });
  return Object.assign(obj, props.slots || {});
});

const formRef = ref<InstanceType<typeof AutoForm>>();
const dialogRef = ref();

const modalShow = ref(false);
const saveLoading = ref(false);

const formValue = ref<Record<string, unknown>>({});

const ok = async () => {
  let res0 = await formRef.value!.validate();
  if (!res0[0]) {
    return;
  }
  if (props.okConfirm) {
    let [err, res] = await AWAIT(props.okConfirm(formValue.value));
    if (!res) {
      console.log(err);
      return;
    }
  }
  if (props.ok) {
    saveLoading.value = true;
    let [err, res] = await AWAIT(props.ok(formValue.value));
    saveLoading.value = false;
    if (res) {
      modalShow.value = false;
    } else {
      console.log(err);
    }
  } else {
    emit("ok", formValue.value);
  }
};

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

const show = (data?: Record<string, unknown> | null) => {
  if (data) {
    formValue.value = data;
  } else {
    formValue.value = {};
  }
  setTimeout(() => {
    modalShow.value = true;
  });
};

const validate = async () => {
  return formRef.value!.validate();
};

defineExpose({
  form: formRef,
  dialog: dialogRef,
  setData,
  getData,
  show,
  modalShow,
  validate,
});
</script>