import type { ElTreeSelect } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType, VjOptions } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfTreeSelectModel = ElModelType<typeof ElTreeSelect>;

export type VjfTreeSelectProps = VjFormItemBase & {
  type: "treeselect";
  options?: ((item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => VjOptions) | VjOptions; // 选项
  // [Vue warn]: Invalid prop: type check failed for prop "options". Expected Function, got Array
  elTreeSelectProps?: ElPropsType<typeof ElTreeSelect> | ((item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => ElPropsType<typeof ElTreeSelect>); // ElTreeSelect参数
  elTreeSelectEmit?: ElEventType<typeof ElTreeSelect>;  // ElTreeSelect事件

  onChangePrefix?: (options: VjOptions, value: unknown, item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => unknown;  // 在参数传入onChange事件前进行处理

  remote?: boolean; // 远程异步加载开关
  remoteFunc?: (params: {query: string}, item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => Promise<VjOptions>;  // 异步加载函数
  remoteInitQuery?: boolean;  // 初始化加载开关
  remoteInitOptions?: (item: VjfTreeSelectPropsTotal, model?: Record<string, unknown>) => Promise<VjOptions>; // 初始化默认选项
  remoteParamAttach?: Record<string, unknown> | ((item: VjfTreeSelectPropsTotal, model: Record<string, unknown>) => Record<string, unknown>); // 异步加载附加参数

  skDefault?: string; // default插槽
  skHeader?: string;  // header插槽
  skFooter?: string;  // footer插槽
  skEmpty?: string; // empty插槽
  skPrefix?: string;  // prefix插槽
  skLoading?: string; // loading插槽
  skTag?: string; // tag插槽
  skLabel?: string; // label插槽
};

export type VjfTreeSelectPropsTotal =  VjFormItemAttach & VjfTreeSelectProps;