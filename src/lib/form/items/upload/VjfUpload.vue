<template>
  <div>
    <el-upload ref="uploadRef" :http-request="upload" :limit="props.limit" :disabled="props.disabled" :multiple="props.multiple"
      :file-list="fileList" :on-preview="preview" :on-success="onSuccess" :on-remove="onRemove" v-bind="props.elUploadProps" v-on="props.elUploadEmit || {}" >
      <template #default>
        <component v-if="props.skDefault && slots[props.skDefault]" :is="VjSlotRender(slots[props.skDefault]!, { props, model })" />
        <div v-else>
          <el-icon class="i-ep-plus" v-if="props.elUploadProps?.listType === 'picture-card'"></el-icon>
          <el-button type="primary" v-else>点击上传</el-button>
        </div>
      </template>
      <template v-if="props.skTip && slots[props.skTip]" #tip>
        <component :is="VjSlotRender(slots[props.skTip]!, { props, model })" />
      </template>
      <template v-if="props.skTrigger && slots[props.skTrigger]" #trigger>
        <component :is="VjSlotRender(slots[props.skTrigger]!, { props, model })" />
      </template>
      <template v-if="props.skFile && slots[props.skFile]" #file="scope">
        <component :is="VjSlotRender(slots[props.skFile]!, { props, model, scope })" />
      </template>
    </el-upload>
    <el-dialog ref="dialogRef" v-model="previewVisible">
      <img :src="previewFile!.url" :alt="previewFile!.name" class="vj-w-full" />
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { type UploadRequestOptions, ElUpload, ElDialog, ElButton } from "element-plus";
import { type VjfUploadModel, type VjfUploadPropsTotal } from ".";
import type { UploadUserFile, UploadFile } from "element-plus";
import { computed, onMounted, ref, useAttrs } from "vue";
import { VjSlotRender, useVjConfStore } from "../../../utils";

const conf = useVjConfStore();

const model = defineModel<VjfUploadModel>();
const p = defineProps<VjfUploadPropsTotal>();
const attrs = useAttrs();
const props = computed(() => {return Object.assign({}, p, attrs)});

const uploadRef = ref<InstanceType<typeof ElUpload>>();
const dialogRef = ref<InstanceType<typeof ElDialog>>();

const slots = computed(() => {
  return props.value.slots || {};
});

const fileList = ref<UploadUserFile[]>([]);

const upload: (
  options: UploadRequestOptions,
) => XMLHttpRequest | Promise<unknown> = async (options) => {
  let func = props.value.uploadFunc || conf.getConf().uploadFunc;

  if (func) {
    let res = await func(options);
    if (res) {
      onChange();
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const onChange = () => {
  props.value.onChange && props.value.onChange(fileList.value, props.value, props.value.model!);
};

const onRemove = (file: UploadUserFile) => {
  fileList.value = fileList.value.filter((item) => item.uid !== file.uid);
  onChange();
};

const previewVisible = ref(false);
const previewFile = ref<UploadFile>()

const preview = (file: UploadFile) => {
  previewFile.value = file;
  previewVisible.value = true;
};

const onSuccess = (response: Record<string, unknown>, file: UploadFile) => {
  if (response.fileId) {
    fileList.value.push({ uid: file.uid, ...response } as UploadUserFile);
    onChange();
  }
};

onMounted(async () => {
  if (props.value.initFunc) {
    let res = await props.value.initFunc(props.value.model!, props.value);
    if (res.length > 0) {
      fileList.value = res;
      onChange();
    }
  }
});

defineExpose({
  model,  // 值
  props,  // 参数
  uploadRef,  // el-upload实例ref
  dialogRef // 预览el-dialog实例ref
});
</script>