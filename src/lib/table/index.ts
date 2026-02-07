import VjTable from "./VjTable.vue";
export { VjTable };

import { type Slots } from "vue";
import {
  ElPagination,
  ElTable,
  ElTableColumn,
  type PaginationEmits,
  type TableColumnCtx,
} from "element-plus";
import type { ElEventType, ElPropsType } from "../utils";

export type VjTableItemBase = {
  prop?: string; // 取值字段
  label: string;  // 标题
  elProps?: InstanceType<typeof ElTableColumn>["$props"]; // ElTableColumn的参数

  skDefault?: string; // default插槽key，配置此项等同于单元格自定义
  skHeader?: string;  // header插槽key
  slots?: Slots;

  pIndex?: number;
  pSize?: number;
  width?: string | number;  // 宽度，全局rem开启后，数字单位会自动计算，1单位代表基准屏幕宽度下的10px
  minWidth?: string | number; // 最小宽度，同width，默认值是基准屏幕宽度下100px
  formatter?: (// 格式化函数，对字段值做二次处理
    scope: ElTableScope & { _props: Record<string, unknown> },
    value: unknown,
  ) => unknown;
  ellipsis?: boolean; // 开启后超长会省略
  fixed?: 'left' | 'right' | boolean;// 固定列
};

export type VjTableItemIndex = VjTableItemBase & {// 索引单元格
  type?: "index";
};

export type VjTableItemExpand = VjTableItemBase & {// 扩展单元格
  type?: "expand";
};

export type VjTableItemSelect = VjTableItemBase & {// 复选单元格
  type?: "select";
};

export type VjTableItemMap = VjTableItemBase & {// 值映射单元格
  type?: "map";
  map?:// 映射字典
  | Record<string | number | symbol, string>
  | ((item: VjTableItemMap) => Record<string | number | symbol, string>);
  isArray?: boolean;// 数组映射
};

export type VjTableItemReg = VjTableItemBase & {// 注册子组件单元格
  type: string;
  regProps?: Record<string, unknown>;// 子组件props
  regEmit?: Record<string, Function>;// 子组件事件
};

export type VjTableItemChild =
  | VjTableItemBase
  | VjTableItemMap
  | VjTableItemExpand
  | VjTableItemSelect
  | VjTableItemIndex
  | VjTableItemReg;

export type VjTableItemParent = Partial<Omit<VjTableItemBase, "prop">> & {
  children?: VjTableConfigItem[];
};

export type VjTableConfigItem = VjTableItemParent | VjTableItemChild; // 支持单元格嵌套

export type VjTableProps<T = unknown> = { // 表格参数
  data?: T[]; // 数据
  total?: number; // 总数
  cloumns?: VjTableConfigItem[]; // 单元格配置
  elProps?: ElPropsType<typeof ElTable>; // ElTable参数
  elEmit?: ElEventType<typeof ElTable>; // ElTable事件
  skDefault?: string; // default插槽key
  skAppend?: string; // append插槽key
  skEmpty?: string; // empty插槽key
  slots?: Slots; // 可全局透传vue插槽

  elPagiProps?: ElPropsType<typeof ElPagination>; // ElPagination参数
  elPagiEmit?: Partial<Record<keyof PaginationEmits, (...args: unknown[]) => unknown>>; // ElPagination事件
  skPagiDefault?: string; // ElPagination的default插槽key
};

export type ElTableScope = { row: Record<string, unknown>; column: TableColumnCtx; $index: number }; // 一些ElTable事件的参数类型