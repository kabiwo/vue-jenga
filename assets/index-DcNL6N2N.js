import{_ as o}from"./index.vue_vue_type_script_setup_true_lang-BPgZkEuw.js";import{d as e,i as t,e as p,o as l}from"./index-y3C4ZVii.js";const r=`# 组件介绍

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

# 运行实例`,u=e({__name:"index",setup(s){return(a,i)=>{const n=o;return l(),t(n,{mdStr:p(r)},null,8,["mdStr"])}}});export{u as default};
