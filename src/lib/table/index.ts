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
  prop?: string;
  label: string;
  elProps?: InstanceType<typeof ElTableColumn>["$props"];

  skDefault?: string;
  skHeader?: string;
  slots?: Slots;

  pIndex?: number;
  pSize?: number;
  width?: string | number; // number->rem
  minWidth?: string | number; // number->rem
  formatter?: (
    scope: ElTableScope,
    value: unknown,
  ) => unknown;
  ellipsis?: boolean;
};

export type VjTableItemIndex = VjTableItemBase & {
  type?: "index"; 
};

export type VjTableItemExpand = VjTableItemBase & {
  type?: "expand";
};

export type VjTableItemSelect = VjTableItemBase & {
  type?: "select";
};

export type VjTableItemMap = VjTableItemBase & {
  type?: "map";
  map?:
    | Record<string | number | symbol, string>
    | ((item: VjTableItemMap) => Record<string | number | symbol, string>);
  isArray?: boolean;
};

export type VjTableItemChild =
  | VjTableItemBase
  | VjTableItemMap
  | VjTableItemExpand
  | VjTableItemSelect
  | VjTableItemIndex;

export type VjTableItemParent = Partial<Omit<VjTableItemBase, "prop">> & {
  children?: VjTableConfigItem[];
};

export type VjTableConfigItem = VjTableItemParent | VjTableItemChild;

export type VjTableProps<T = unknown> = {
  data?: T[];
  total?: number;
  cloumns?: VjTableConfigItem[];
  elProps?: ElPropsType<typeof ElTable>;
  elEmit?: ElEventType<typeof ElTable>;
  skDefault?: string;
  skAppend?: string;
  skEmpty?: string;
  slots?: Slots;

  elPagiProps?: ElPropsType<typeof ElPagination>;
  elPagiEmit?: Partial<Record<keyof PaginationEmits, (...args: unknown[]) => unknown>>;
  skPagiDefault?: string;
};

export type ElTableScope = { row: Record<string, unknown>; column: TableColumnCtx; $index: number };