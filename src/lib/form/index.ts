import 'virtual:uno.css' // vite build trigger css collect

import VjForm from './VjForm.vue';
import type { Slots } from 'vue';
import type { ElForm, FormItemRule, FormRules } from 'element-plus';
import type { ElPropsType } from '../utils';
export { VjForm };

export type ElFormInsType = InstanceType<typeof ElForm>;

export type VjFormItemAttach = {  // 父组件向子组件注入的附加参数
  labelMap: Record<string, string>; // 表单统一计算label字典传入表单项
  model: Record<string, unknown>; // 给子组件接收的回调函数传参
  rootModel: Record<string, unknown>; // 为split等多级表单场景统一收集model数据透传
  addItemRule: (key: string, rule: VjFormItemProps) => FormRules; // 允许子组件异步增加规则
  rmItemRule: (key: string) => FormRules; // 子组件异步移除规则
  addSubForm: (key: string, form: ElFormInsType) => Record<string, ElFormInsType>; // 子组件增加子表单，用于校验
  rmSubForm: (key: string) => Record<string, ElFormInsType>; // 子组件注销子表单，用于校验
  slots?: Slots;  // 透传slots
  disabled?: boolean; // 传入disabled结果
};

export type VjFormItemBase = { // 用户输入的基准参数
  disableCheck?: boolean | ((props: VjFormItemProps, model: Record<string, unknown>) => boolean); // 检查disabled状态
  defaultValue?: unknown | ((props: VjFormItemProps, model: Record<string, unknown>) => unknown); // 传入默认值
  label?: string | ((item: VjFormItemProps) => string); // 标签
  code: string; // 唯一编码
  required?: boolean; // 必填
  placeholder?: string; // placeholder文本
  noPlaceholder?: boolean;  // 不显示placeholder
  rules?: FormItemRule | FormItemRule[];  // 校验规则
  hide?: boolean | ((item: VjFormItemProps, model: Record<string, unknown>) => boolean); // 隐藏
  onChange?: (value: unknown, item: VjFormItemProps, model: Record<string, unknown>) => void; // 值变化

  spanPre?: number; // 前缀尺寸
  skPre?: string; // 前缀插槽
  spanPost?: number;  // 后缀尺寸
  skPost?: string;  // 后缀插槽

  colspan?: number; // 跨列
  rowspan?: number; // 跨行

  [x: string]: unknown;
};

export type ItemCustomProps = VjFormItemBase & {
  type: "custom";
  skDefault?: string;
  formatter?: (value: unknown, item: VjFormItemProps, model: Record<string, unknown>) => unknown;
  className?: string
};

export type ItemEmptyProps = VjFormItemBase & {
  type: "empty";
};

export type ItemForProps = VjFormItemBase & {
  type: "for";
  forItems?: VjFormItemProps[] | ((props: ItemForProps, model: Record<string, unknown>) => VjFormItemProps[]);
};

export type VjFormItemProps =
  | ItemCustomProps
  | ItemEmptyProps
  | ItemForProps

export type VjFormItemPropsTotal = VjFormItemProps & VjFormItemAttach;

export type VjFormPropsAttach = {
  rootModel?: Record<string, unknown>;
};

export type VjFormProps = {
  col?: number;
  form?: VjFormItemProps[];
  elFormProps?: ElPropsType<typeof ElForm>;
  slots?: Slots;
  loading?: boolean;
};

export type VjFormPropsTotal = VjFormProps & VjFormPropsAttach;

