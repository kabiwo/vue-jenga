import type { ElSwitch } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfSwitchModel = ElModelType<typeof ElSwitch>;

export type VjfSwitchProps = VjFormItemBase & {
  type: "switch";
  elSwitchProps?: ElPropsType<typeof ElSwitch>;
  elSwitchEmit?: ElEventType<typeof ElSwitch>;
  skActiveAction?: string;
  skInactiveAction?: string;
};

export type VjfSwitchPropsTotal = VjFormItemAttach & VjfSwitchProps;
