import type { ElRadio, ElRadioGroup } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType, VjOptionItem } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfRadioModel = ElModelType<typeof ElRadioGroup>;

export type VjfRadioOption = VjOptionItem & { // 扩展VjOption
  elRadioProps?: ElPropsType<typeof ElRadio>; // ElRadio参数
  elRadioEmit?: ElEventType<typeof ElRadio>;  // ElRadio插槽
};

export type VjfRadioProps = VjFormItemBase & {
  type: "radio";
  button?: boolean; // 按钮模式
  options?: VjfRadioOption[] | ((item: VjfRadioProps, model: Record<string, unknown>) => VjfRadioOption[]); // 选项
  // [Vue warn]: Invalid prop: type check failed for prop "options". Expected Function, got Array
  elRadioProps?: ElPropsType<typeof ElRadioGroup> | ((item: VjfRadioProps, model: Record<string, unknown>) => ElPropsType<typeof ElRadioGroup>);  // ElRadio参数
  elRadioEmit?: ElEventType<typeof ElRadioGroup>; // ElRadio事件
  skOptionDefault?: string; // option的default插槽
};

export type VjfRadioPropsTotal = VjFormItemAttach & VjfRadioProps;