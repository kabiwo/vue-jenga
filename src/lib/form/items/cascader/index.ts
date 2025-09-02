import type { CascaderNode, CascaderProps, ElCascader, ElCascaderPanel, Resolve } from "element-plus";
import type { ElModelType, ElPropsType, VjOptions } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfCascaderModel = ElModelType<typeof ElCascader> | ElModelType<typeof ElCascaderPanel>;

export type ElCascaderLazyLoad = (node: CascaderNode, resolve: Resolve) => void;

export type VjfCascaderProps = VjFormItemBase & {
  type: "cascader";
  options?: VjOptions<string | number>; // 静态选项
  props?: CascaderProps;  // El的cascader参数
  lazyLoad?: ElCascaderLazyLoad;  // 异步加载方法
  lazyLoadFunc?: (item: VjfCascaderPropsTotal, model: Record<string, unknown>) => ElCascaderLazyLoad; // 可以接受表单参数的异步加载方法
  elCascaderProps?: ElPropsType<typeof ElCascader> | ElPropsType<typeof ElCascaderPanel>; // ElCascader参数
  elCascaderEmit?: Record<string, (...args: unknown[]) => unknown>; // ElCascader事件
  // elCascaderEmit?: ElEventType<typeof ElCascader>

  panel?: boolean;  // 非下拉模式
  lazy?: boolean; // 开启异步加载节点

  skDefault?: string; // default插槽
  skHeader?: string;  // header插槽
  skFooter?: string;  // footer插槽
  skEmpty?: string; // empty插槽
  skPrefix?: string;  // prefix插槽
  skSuggestionItem?: string;  // suggestion-item插槽
  skTag?: string; // tag插槽
};

export type VjfCascaderPropsTotal = VjFormItemAttach & VjfCascaderProps;