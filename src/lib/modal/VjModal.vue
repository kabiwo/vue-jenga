<template>
  <div>
    <el-dialog ref="dialogRef" v-model="dialogShow" :close-on-click-modal="false" destroy-on-close :title="props.title"
      :width="props.width" @closed="$emit('closed')" style="--el-message-close-size: 0.4rem" v-bind="props.elDialogProps"
      v-on="props.elDialogEmit || {}">
      <template #default="scope">
        <component v-if="props.skDefault && slots[props.skDefault]" :is="VjSlotRender(slots[props.skDefault]!, scope)" />
        <slot v-else></slot>
      </template>
      <template #footer>
        <div class="modal-footer" v-if="!props.noFooter">
          <el-button @click="cancel">{{ props.cancelText || '取消' }}</el-button>
          <el-button type="primary" :loading="saveLoading" @click="confirm">{{ props.confirmText || '确定' }}</el-button>
        </div>
      </template>
      <template v-if="props.skHeader && slots[props.skHeader]" #default="scope">
        <component :is="VjSlotRender(slots[props.skHeader]!, scope)" />
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ElDialog, ElButton } from 'element-plus';
import type { VjModalProps } from '.';
import { computed, ref, useSlots, type Slots } from 'vue';
import { assign, mapKeys, tryit } from 'radash';
import { VjSlotRender } from '../utils';

const dialogShow = ref(false);

const props = defineProps<VjModalProps>();

const emit = defineEmits<{
  cancel: [];
  confirm: [];
  closed: [];
}>();

const s: Slots = useSlots();
const slots = computed<Slots>(() => {
  return assign(mapKeys(s, key => key), props.slots || {});
});

const dialogRef = ref<InstanceType<typeof ElDialog>>();

const saveLoading = ref(false);

const cancel = () => {
  dialogShow.value = false;
  emit("cancel");
};

const confirm = async () => {
  if (props.confirmCheckFunc) {
    let [err, res] = await tryit(() => props.confirmCheckFunc!())();
    if (!res) {
      console.log(err);
      return;
    }
  }
  if (props.confirmFunc) {
    saveLoading.value = true;
    let [err, res] = await tryit(() => props.confirmFunc!())();
    saveLoading.value = false;
    if (res) {
      dialogShow.value = false;
    } else {
      console.log(err);
    }
  } else {
    emit("confirm");
  }
};

const show = (data?: unknown) => {
  dialogShow.value = true;
  setTimeout(() => {
    props.showFunc && props.showFunc(data);
  });
};

defineExpose({
  dialog: dialogRef,
  show,
  dialogShow
});
</script>