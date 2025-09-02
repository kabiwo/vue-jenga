import type { ElDatePicker } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfDateModel = ElModelType<typeof ElDatePicker>;

export type VjfDateProps = VjFormItemBase & {
  type: "date";
  elDateProps?: ElPropsType<typeof ElDatePicker>; // ElDate参数
  elDateEmit?: ElEventType<typeof ElDatePicker>;  // ElDate事件
};

export type VjfDatePropsTotal = VjFormItemAttach & VjfDateProps;
