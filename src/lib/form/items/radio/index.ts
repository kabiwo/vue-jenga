import type { ElRadio, ElRadioGroup } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType, VjOptionItem } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfRadioModel = ElModelType<typeof ElRadioGroup>;

export type VjfRadioOption = VjOptionItem & {
  elRadioProps?: ElPropsType<typeof ElRadio>;
  elRadioEmit?: ElEventType<typeof ElRadio>;
};

export type VjfRadioProps = VjFormItemBase & {
  type: "radio";
  button?: boolean;
  options?: VjfRadioOption[] | ((item: VjfRadioProps, model: Record<string, unknown>) => VjfRadioOption[]);
  // [Vue warn]: Invalid prop: type check failed for prop "options". Expected Function, got Array
  elRadioProps?: ElPropsType<typeof ElRadioGroup> | ((item: VjfRadioProps, model: Record<string, unknown>) => ElPropsType<typeof ElRadioGroup>);
  elRadioEmit?: ElEventType<typeof ElRadioGroup>;
  skOptionDefault?: string;
};

export type VjfRadioPropsTotal = VjFormItemAttach & VjfRadioProps;