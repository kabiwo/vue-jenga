import type { ElDialog } from "element-plus";
import type { ElEventType, ElPropsType } from "../utils";
import VjModal from "./VjModal.vue";
import VjModalForm from "./VjModalForm.vue";
import type { VjFormProps } from "../form";
import type { Slots } from "vue";

export { VjModal, VjModalForm };

export type VjModalProps = {
  title?: string; // 标题
  width?: number | string;  // 宽度
  cancelText?: string;  // 取消按钮文本
  confirmText?: string; // 确定按钮文本
  confirmFunc?: (value?: unknown) => Promise<boolean>;  // 确定点击函数
  confirmCheckFunc?: (value?: unknown) => Promise<boolean>; // 触发确定点击函数前的校验函数
  showFunc?: (value: unknown) => Promise<boolean>;  // 弹窗展开后的回调函数
  noFooter?: boolean; // 不显示下方按钮
  elDialogProps?: ElPropsType<typeof ElDialog>; // ElDialog参数
  elDialogEmit?: ElEventType<typeof ElDialog>;  // ElDialog事件
  slots?: Slots;  // 插槽
  skDefault?: string; // default插槽
  skHeader?: string;  // header插槽
};

export type VjModalFormProps = VjModalProps & {
  formProps?: VjFormProps;  // VjForm配置

  skPre?: string; // 表单前pre插槽
  skPost?: string;  // 表单后post插槽
};