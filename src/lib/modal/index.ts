import type { ElDialog } from "element-plus";
import type { ElEventType, ElPropsType } from "../utils";
import VjModal from "./VjModal.vue";

export { VjModal };

export type VjModalProps = {
  title?: string;
  width?: number | string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: (value?: unknown) => Promise<boolean>;
  onShow?: (value: unknown) => Promise<boolean>;
  confirmCheckFunc?: (value?: unknown) => Promise<boolean>;
  noFooter?: boolean;
  elDialogProps?: ElPropsType<typeof ElDialog>;
  elDialogEmit?: ElEventType<typeof ElDialog>;
};