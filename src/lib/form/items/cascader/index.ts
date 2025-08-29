import type { CascaderNode, CascaderProps, ElCascader, ElCascaderPanel, Resolve } from "element-plus";
import type { ElModelType, ElPropsType, VjOptions } from "../../../utils";
import type { VjFormItemAttach, VjFormItemBase } from "../..";

export type VjfCascaderModel = ElModelType<typeof ElCascader> | ElModelType<typeof ElCascaderPanel>;

export type ElCascaderLazyLoad = (node: CascaderNode, resolve: Resolve) => void;

export type VjfCascaderProps = VjFormItemBase & {
  type: "cascader";
  options?: VjOptions<string | number>;
  props?: CascaderProps;
  lazyLoad?: ElCascaderLazyLoad;
  lazyLoadFunc?: (item: VjfCascaderPropsTotal, model: Record<string, unknown>) => ElCascaderLazyLoad;
  elCascaderProps?: ElPropsType<typeof ElCascader> | ElPropsType<typeof ElCascaderPanel>;
  elCascaderEmit?: Record<string, (...args: unknown[]) => unknown>;
  // elCascaderEmit?: ElEventType<typeof ElCascader>

  panel?: boolean;
  lazy?: boolean;

  skDefault?: string;
  skHeader?: string;
  skFooter?: string;
  skEmpty?: string;
  skPrefix?: string;
  skSuggestionItem?: string;
  skTag?: string;
};

export type VjfCascaderPropsTotal = VjFormItemAttach & VjfCascaderProps;