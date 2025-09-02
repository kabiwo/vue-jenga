import type { ElInput } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfInputModel = ElModelType<typeof ElInput>;

export type VjfInputProps = VjFormItemBase & {
  type: "input";
  elInputProps?: ElPropsType<typeof ElInput>; // ElInput参数
  elInputEmit?: ElEventType<typeof ElInput>;  // ElInput事件
  skAppend?: string;  // append插槽
};

export type VjfInputPropsTotal = VjFormItemAttach & VjfInputProps;