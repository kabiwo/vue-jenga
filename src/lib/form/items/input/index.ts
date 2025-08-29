import type { ElInput } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfInputModel = ElModelType<typeof ElInput>;

export type VjfInputProps = VjFormItemBase & {
  type: "input";
  elInputProps?: ElPropsType<typeof ElInput>;
  elInputEmit?: ElEventType<typeof ElInput>;
  skAppend?: string;
};

export type VjfInputPropsTotal = VjFormItemAttach & VjfInputProps;