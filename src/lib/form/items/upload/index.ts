import type { ElUpload, UploadRequestOptions, UploadUserFile } from "element-plus";
import type { VjFormItemAttach, VjFormItemBase } from "../..";
import type { ElEventType, ElPropsType } from "../../../utils";

export type VjfUploadModel = unknown;

export type VjfUploadProps = VjFormItemBase & {
  type: "upload";
  elUploadProps?: ElPropsType<typeof ElUpload>;
  elUploadEmit?: ElEventType<typeof ElUpload>;
  initFunc?: (model: Record<string, unknown>, props: VjfUploadProps) => Promise<UploadUserFile[]>
  uploadFunc?: (options: UploadRequestOptions) => Promise<boolean>;
  skDefault?: string;
  skTip?: string;
  skTrigger?: string;
  skFile?: string;

  multiple?: boolean;
  limit?: number;
};

export type VjfUploadPropsTotal = VjFormItemAttach & VjfUploadProps;
