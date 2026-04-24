import type { ElLink } from "element-plus";
import type { ElPropsType } from "../../utils";
import VjFoldLink from "./VjFoldLink.vue";
import type { ElTableScope } from "../../table";
import type { Slots } from "vue";

export { VjFoldLink };

export type VjFoldLinkItem = {
  label: string;  //链接名
  func?: (scope: ElTableScope | undefined, item: VjFoldLinkItem) => void; // 点击函数
  hide?: boolean | ((item: VjFoldLinkItem, scope?: ElTableScope) => boolean); // 是否隐藏
  loading?: boolean;  // loading状态，阻塞点击函数
  elLinkProps?: ElPropsType<typeof ElLink> | ((item: VjFoldLinkItem, scope?: ElTableScope) => ElPropsType<typeof ElLink>); // ElLink类型
};

export type VjFoldLinkProps = {
  tableScope?: ElTableScope;  // 传入ElTableScope
  num?: number; // 显示几个（包括“更多”）
  links?: VjFoldLinkItem[]; // 链接配置
  slots?: Slots; // 注入插槽  
  skDefault?: string; // default 插槽key
  skMore?: string;  // more 插槽key
};
