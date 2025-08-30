import type { ElDialog } from "element-plus";
import type { ElEventType, ElPropsType } from "../utils";
import VjModal from "./VjModal.vue";
import VjModalForm from "./VjModalForm.vue";
import type { VjFormProps } from "../form";
import type { Slots } from "vue";

export { VjModal, VjModalForm };

export type VjModalProps = {
  title?: string;
  width?: number | string;
  cancelText?: string;
  confirmText?: string;
  confirmFunc?: (value?: unknown) => Promise<boolean>;
  confirmCheckFunc?: (value?: unknown) => Promise<boolean>;
  showFunc?: (value: unknown) => Promise<boolean>;
  noFooter?: boolean;
  elDialogProps?: ElPropsType<typeof ElDialog>;
  elDialogEmit?: ElEventType<typeof ElDialog>;
  slots?: Slots;
  skDefault?: string;
  skHeader?: string;
};

export type VjModalFormProps = VjModalProps & {
  formProps?: VjFormProps;

  skPre?: string;
  skPost?: string;
};