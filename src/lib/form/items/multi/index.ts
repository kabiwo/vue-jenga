import type { VjFormItemAttach, VjFormItemBase, VjFormItemProps, VjFormProps } from "../..";

export type VjfMultiModel = unknown[];

export type VjfMultiProps = VjFormItemBase & {
  type: "multi";
  multiItemConf: VjFormItemProps | ((props: VjfMultiPropsTotal, model: VjfMultiModel) => VjFormItemProps); // 子表单的配置
  multiItemDefaultValue: () => unknown; // 设置每个子项的默认值
  onLengthChange?: (index: number, type: 'add' | 'del', scope: {  // 变更回调，返回true则保持默认增减
    props: VjfMultiPropsTotal;
    model: VjfMultiModel;
  }, attach?: unknown ) => boolean;
  multiSpan?: number; // 按钮占位
};

export type VjfMultiPropsTotal = VjFormItemAttach & VjfMultiProps;