import type { ElSelect, ElSelectV2 } from "element-plus";
import type { ElEventType, ElModelType, ElPropsType, VjOptions } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfSelectModel = ElModelType<typeof ElSelect> | ElModelType<typeof ElSelectV2>;


export type VjfSelectProps = VjFormItemBase & {
  type: "select";
  options?: ((item: VjfSelectPropsTotal, model: Record<string, unknown>) => VjOptions) | VjOptions; // 选项
  // [Vue warn]: Invalid prop: type check failed for prop "options". Expected Function, got Array
  elSelectProps?: ElPropsType<typeof ElSelect> | ElPropsType<typeof ElSelectV2> | ((item: VjfSelectPropsTotal, model: Record<string, unknown>) => ElPropsType<typeof ElSelect> | ElPropsType<typeof ElSelectV2>); // ElSelect参数
  elSelectEmit?: ElEventType<typeof ElSelect> | ElEventType<typeof ElSelectV2>; // ElSelect事件
  virtual?: boolean;  // 列表虚拟滚动

  onChangePrefix?: (options: VjOptions, value: unknown, item: VjfSelectPropsTotal, model: Record<string, unknown>) => unknown;  // 值传给onChange事件前进行预处理

  remote?: boolean; // 远程异步加载开关
  remoteFunc?: (params: {query: string}, item: VjfSelectPropsTotal, model: Record<string, unknown>) => Promise<VjOptions>;  // 远程加载函数
  remoteInitQuery?: boolean;  // 初始化加载开关
  remoteInitOptions?: (item: VjfSelectPropsTotal, model?: Record<string, unknown>) => Promise<VjOptions>; // 初始化默认选项
  remoteParamAttach?: Record<string, unknown> | ((item: VjfSelectPropsTotal, model: Record<string, unknown>) => Record<string, unknown>); // 远程加载附加参数

  skDefault?: string; // default插槽
  skHeader?: string;  // header插槽
  skFooter?: string;  // footer插槽
  skEmpty?: string; // empty插槽
  skPrefix?: string;  // prefix插槽
  skLoading?: string; // loading插槽
  skTag?: string; // tag插槽
  skLabel?: string; // label插槽

  skOptionDefault?: string; // option的default插槽
};

export type VjfSelectPropsTotal =  VjFormItemAttach & VjfSelectProps;