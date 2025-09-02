import type { ElInputNumber } from "element-plus";
import type { VjFormItemAttach, VjFormItemBase } from "../..";
import type { ElEventType, ElModelType, ElPropsType } from "../../../utils";

export type VjfNumberModel = ElModelType<typeof ElInputNumber>;

export type VjfNumberProps = VjFormItemBase & {
  type: "number";
  elNumberProps?: ElPropsType<typeof ElInputNumber>; // ElNumber参数
  elNumberEmit?: ElEventType<typeof ElInputNumber>; // ElNumber事件
  skSuffix?: string;  // suffix插槽
  wfull?: boolean;  // 是否占满容器宽度
};

export type VjfNumberPropsTotal = VjFormItemAttach & VjfNumberProps;