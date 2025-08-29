import type { ElDatePicker } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfDateModel = ElModelType<typeof ElDatePicker>;

export type VjfDateProps = VjFormItemBase & {
  type: "date";
  elDateProps?: ElPropsType<typeof ElDatePicker>;
  elDateEmit?: ElEventType<typeof ElDatePicker>;
};

export type VjfDatePropsTotal = VjFormItemAttach & VjfDateProps;
