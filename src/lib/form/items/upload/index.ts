import type { ElUpload, UploadRequestOptions, UploadUserFile } from "element-plus";
import type { VjFormItemAttach, VjFormItemBase } from "../..";
import type { ElEventType, ElPropsType } from "../../../utils";

export type VjfUploadModel = unknown;

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

export type VjfUploadPropsTotal = VjFormItemAttach & VjfUploadProps;
