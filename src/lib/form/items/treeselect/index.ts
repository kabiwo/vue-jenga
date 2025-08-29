import type { ElTreeSelect } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType, VjOptions } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfTreeSelectModel = ElModelType<typeof ElTreeSelect>;

export type VjfTreeSelectProps = VjFormItemBase & {
  type: "treeselect";
  options?: ((item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => VjOptions) | VjOptions;
  // [Vue warn]: Invalid prop: type check failed for prop "options". Expected Function, got Array
  elTreeSelectProps?: ElPropsType<typeof ElTreeSelect> | ((item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => ElPropsType<typeof ElTreeSelect>);
  elTreeSelectEmit?: ElEventType<typeof ElTreeSelect>;

  onChangePrefix?: (options: VjOptions, value: unknown, item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => unknown;

  remote?: boolean;
  remoteFunc?: (params: {query: string}, item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => Promise<VjOptions>;
  remoteInitQuery?: boolean;
  remoteInitOptions?: (item: VjfTreeSelectPropsTotal, model?: Record<string, unknown>) => Promise<VjOptions>;
  remoteParamAttach?: Record<string, unknown> | ((item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => Record<string, unknown>);

  skDefault?: string;
  skHeader?: string;
  skFooter?: string;
  skEmpty?: string;
  skPrefix?: string;
  skLoading?: string;
  skTag?: string;
  skLabel?: string;
};

export type VjfTreeSelectPropsTotal =  VjFormItemAttach & VjfTreeSelectProps;