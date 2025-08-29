import type { ElInputNumber } from "element-plus";
import type { VjFormItemAttach, VjFormItemBase } from "../..";
import type { ElEventType, ElModelType, ElPropsType } from "../../../utils";

export type VjfNumberModel = ElModelType<typeof ElInputNumber>;

export type VjfNumberProps = VjFormItemBase & {
  type: "number";
  elNumberProps?: ElPropsType<typeof ElInputNumber>;
  elNumberEmit?: ElEventType<typeof ElInputNumber>;
  skSuffix?: string;
  wfull?: boolean;
};

export type VjfNumberPropsTotal = VjFormItemAttach & VjfNumberProps;