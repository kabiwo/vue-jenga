import type { ElSelect, ElSelectV2 } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType, VjOptions } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfSelectModel = ElModelType<typeof ElSelect> | ElModelType<typeof ElSelectV2>;


export type VjfSelectProps = VjFormItemBase & {
  type: "select";
  options?: ((item: VjfSelectPropsTotal, model: Record<string, unknown>) => VjOptions) | VjOptions;
  // [Vue warn]: Invalid prop: type check failed for prop "options". Expected Function, got Array
  elSelectProps?: ElPropsType<typeof ElSelect> | ElPropsType<typeof ElSelectV2> | ((item: VjfSelectPropsTotal, model: Record<string, unknown>) => ElPropsType<typeof ElSelect> | ElPropsType<typeof ElSelectV2>);
  elSelectEmit?: ElEventType<typeof ElSelect> | ElEventType<typeof ElSelectV2>;
  virtual?: boolean;

  onChangePrefix?: (options: VjOptions, value: unknown, item: VjfSelectPropsTotal, model: Record<string, unknown>) => unknown;

  remote?: boolean;
  remoteFunc?: (params: {query: string}, item: VjfSelectPropsTotal, model: Record<string, unknown>) => Promise<VjOptions>;
  remoteInitQuery?: boolean;
  remoteInitOptions?: (item: VjfSelectPropsTotal, model?: Record<string, unknown>) => Promise<VjOptions>;
  remoteParamAttach?: Record<string, unknown> | ((item: VjfSelectPropsTotal, model: Record<string, unknown>) => Record<string, unknown>);

  skDefault?: string;
  skHeader?: string;
  skFooter?: string;
  skEmpty?: string;
  skPrefix?: string;
  skLoading?: string;
  skTag?: string;
  skLabel?: string;

  skOptionDefault?: string;
};

export type VjfSelectPropsTotal =  VjFormItemAttach & VjfSelectProps;