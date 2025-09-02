import type { ElTimePicker } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfTimeModel = ElModelType<typeof ElTimePicker>;

export type VjfTimeProps = VjFormItemBase & {
  type: "time";
  elTimeProps?: ElPropsType<typeof ElTimePicker>; // ElTime参数
  elTimeEmit?: ElEventType<typeof ElTimePicker>;  // ElTime事件
};

export type VjfTimePropsTotal = VjFormItemAttach & VjfTimeProps;
