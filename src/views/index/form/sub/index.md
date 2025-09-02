# 组件介绍

表单的嵌套表单子项

# 使用方法

配置表单项时，指定type为“sub”，参数类型如下： 

```ts
export type VjfSubProps = VjFormItemBase & {
  type: "sub";
  subFormConf?: VjFormProps | ((props: VjfSubPropsTotal, model: VjfSubModel) => VjFormProps); // 子表单的配置
};

```

# 运行实例

参看[VjForm实例1](/#/form/)中相关项