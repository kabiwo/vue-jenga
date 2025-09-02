import type { VjFormItemAttach, VjFormItemBase, VjFormProps } from "../..";

export type VjfSubModel = Record<string, unknown>;

export type VjfSubProps = VjFormItemBase & {
  type: "sub";
  subFormConf?: VjFormProps | ((props: VjfSubPropsTotal, model: VjfSubModel) => VjFormProps); // 子表单的配置
};

export type VjfSubPropsTotal = VjFormItemAttach & VjfSubProps;