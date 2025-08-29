import type { ElCheckbox, ElCheckboxGroup } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType, VjOptionItem } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfCheckboxModel = ElModelType<typeof ElCheckboxGroup>;

export type VjfCheckboxOption = VjOptionItem & {
  elCheckboxProps?: ElPropsType<typeof ElCheckbox>;
  elCheckboxEmit?: ElEventType<typeof ElCheckbox>;
};

export type VjfCheckboxProps = VjFormItemBase & {
  type: "checkbox";
  button?: boolean;
  options?: VjfCheckboxOption[] | ((item: VjfCheckboxProps, model: Record<string, unknown>) => VjfCheckboxOption[]);
  // [Vue warn]: Invalid prop: type check failed for prop "options". Expected Function, got Array
  elCheckboxProps?: ElPropsType<typeof ElCheckboxGroup> | ((item: VjfCheckboxProps, model: Record<string, unknown>) => ElPropsType<typeof ElCheckboxGroup>);
  elCheckboxEmit?: ElEventType<typeof ElCheckboxGroup>;
  skOptionDefault?: string;
};

export type VjfCheckboxPropsTotal = VjFormItemAttach & VjfCheckboxProps;