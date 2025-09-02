# 组件介绍

用于循环生成表单子项，减轻雷同表单项的配置负担

# 使用方法

在配置表格时，指定参数type为“repeat”，参数类型如下

```ts

export type VjfRepeatProps = VjFormItemBase & { // 循环生成
  type: "repeat";
  repeatItems?: VjFormItemProps[] | ((props: VjfRepeatProps, model: Record<string, unknown>) => VjFormItemProps[]); // 循环项
};
```
