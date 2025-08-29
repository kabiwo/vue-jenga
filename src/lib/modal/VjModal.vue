<template>
  <el-dialog ref="dialogRef" v-model="dialogShow" :close-on-click-modal="false" destroy-on-close :title="props.title" :width="props.width"
    @closed="$emit('closed')" style="--el-message-close-size: 0.4rem" v-bind="props.elDialogProps"
    v-on="props.elDialogEmit || {}">
    <slot></slot>
    <template #footer>
      <div class="modal-footer" v-if="!props.noFooter">
        <el-button @click="cancel">{{ props.cancelText || '取消' }}</el-button>
        <el-button type="primary" :loading="saveLoading" @click="confirm">{{ props.confirmText || '确定' }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElDialog, ElButton } from 'element-plus';
import type { VjModalProps } from '.';
import { ref } from 'vue';
import { tryit } from 'radash';

const dialogShow = ref(false);

const props = defineProps<VjModalProps>();

const emit = defineEmits<{
  cancel: [];
  confirm: [];
  closed: [];
}>();

defineSlots<{
  default(): unknown;
}>();

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
  if (props.onConfirm) {
    saveLoading.value = true;
    let [err, res] = await tryit(() => props.onConfirm!())();
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
    props.onShow && props.onShow(data);
  });
};

defineExpose({
  dialog: dialogRef,
  show,
  dialogShow
});
</script>