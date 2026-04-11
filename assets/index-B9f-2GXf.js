import{_ as e}from"./index.vue_vue_type_script_setup_true_lang-C_la5NJq.js";import{d as o,i as p,e as l,o as t}from"./index-CITCoo_u.js";const r=`# 组件介绍

表单里的文件上传子项

# 使用方法

在配置表单项时，参数type传入“upload”，参数类型如下：

\`\`\`ts

export type VjfUploadProps = VjFormItemBase & {
  type: "upload";
  elUploadProps?: ElPropsType<typeof ElUpload>; // ElUpload参数
  elUploadEmit?: ElEventType<typeof ElUpload>;  // ElUpload事件
  initFunc?: (model: Record<string, unknown>, props: VjfUploadProps) => Promise<UploadUserFile[]>;  // 初始化文件列表
  uploadFunc?: (options: UploadRequestOptions) => Promise<boolean>; // 上传函数
  skDefault?: string; // default插槽
  skTip?: string; // tip插槽
  skTrigger?: string; // trigger插槽
  skFile?: string;  // file插槽

  multiple?: boolean; // 多选
  limit?: number; // 数量限制
};

\`\`\`

# 外部交互

组件通过defineExpose暴露如下内容  

\`\`\`ts
defineExpose({
  model,  // 值
  props,  // 参数
  uploadRef,  // el-upload实例ref
  dialogRef // 预览el-dialog实例ref
});
\`\`\`

# 运行实例`,f=o({__name:"index",setup(s){return(a,i)=>{const n=e;return t(),p(n,{mdStr:l(r)},null,8,["mdStr"])}}});export{f as default};
