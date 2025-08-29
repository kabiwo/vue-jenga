<template>
  <div>
    <el-upload :http-request="upload" :limit="props.limit" :disabled="props.disabled" :multiple="props.multiple"
      :file-list="fileList" :on-preview="preview" :on-success="onSuccess" :on-remove="onRemove" v-bind="props.elUploadProps" v-on="props.elUploadEmit || {}" >
      <template  #default>
        <component v-if="props.skDefault && slots[props.skDefault]" :is="VjSlotRender(slots[props.skDefault]!, { props, model })" />
        <div v-else>
          <el-button type="primary">点击上传</el-button>
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
    <el-dialog v-model="previewVisible">
      <img :src="previewFile!.url" :alt="previewFile!.name" class="vj-w-full" />
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { type UploadRequestOptions, ElUpload, ElDialog, ElButton } from "element-plus";
import { type VjfUploadModel, type VjfUploadPropsTotal } from ".";
import type { UploadUserFile, UploadFile } from "element-plus";
import { computed, onMounted, ref } from "vue";
import { VjSlotRender, useVjConfStore } from "../../../utils";

const conf = useVjConfStore();

const model = defineModel<VjfUploadModel>();
const props = defineProps<VjfUploadPropsTotal>();

const slots = computed(() => {
  return props.slots || {};
});

const fileList = ref<UploadUserFile[]>([]);

const upload: (
  options: UploadRequestOptions,
) => XMLHttpRequest | Promise<unknown> = async (options) => {
  let func = props.uploadFunc || conf.getConf().uploadFunc;

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
  props.onChange && props.onChange(fileList.value, props, props.model!);
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
  if (props.initFunc) {
    let res = await props.initFunc(props.model!, props);
    if (res.length > 0) {
      fileList.value = res;
      onChange();
    }
  }
});
</script>