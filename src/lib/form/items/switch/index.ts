import type { ElSwitch } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfSwitchModel = ElModelType<typeof ElSwitch>;

export type VjfSwitchProps = VjFormItemBase & {
  type: "switch";
  elSwitchProps?: ElPropsType<typeof ElSwitch>; // ElSwitch参数
  elSwitchEmit?: ElEventType<typeof ElSwitch>;  // ElSwitch事件
  skActiveAction?: string;  // active-action插槽
  skInactiveAction?: string;  // inactive-action插槽
};

export type VjfSwitchPropsTotal = VjFormItemAttach & VjfSwitchProps;
