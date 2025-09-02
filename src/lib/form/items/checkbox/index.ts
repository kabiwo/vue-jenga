import type { ElCheckbox, ElCheckboxGroup } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType, VjOptionItem } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfCheckboxModel = ElModelType<typeof ElCheckboxGroup>;

export type VjfCheckboxOption = VjOptionItem & {  // 扩展VjOption
  elCheckboxProps?: ElPropsType<typeof ElCheckbox>; // ElCheckbox参数
  elCheckboxEmit?: ElEventType<typeof ElCheckbox>;  // ElCheckbox事件
};

export type VjfCheckboxProps = VjFormItemBase & {
  type: "checkbox";
  button?: boolean; // 按钮模式
  options?: VjfCheckboxOption[] | ((item: VjfCheckboxProps, model: Record<string, unknown>) => VjfCheckboxOption[]);  // 选项
  // [Vue warn]: Invalid prop: type check failed for prop "options". Expected Function, got Array
  elCheckboxProps?: ElPropsType<typeof ElCheckboxGroup> | ((item: VjfCheckboxProps, model: Record<string, unknown>) => ElPropsType<typeof ElCheckboxGroup>);  // ElCheckbox参数
  elCheckboxEmit?: ElEventType<typeof ElCheckboxGroup>; // ElCheckbox事件
  skOptionDefault?: string; // option的default参数
};

export type VjfCheckboxPropsTotal = VjFormItemAttach & VjfCheckboxProps;